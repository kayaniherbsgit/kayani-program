// Enhanced Kaya E-Learning Application
document.addEventListener('DOMContentLoaded', function() {
  // Configuration
  const config = {
    apiBaseUrl: 'http://localhost:5000/api',
    minPasswordLength: 8,
    progressThreshold: 70, // Minimum % to mark lesson as complete
    tokenRefreshInterval: 840000 // 14 minutes (JWT expires in 15m)
  };

  // State Management
  const appState = {
    user: null,
    token: null,
    refreshToken: null,
    userProgress: {
      completedLessons: [],
      lastAccessed: null,
      lessonProgress: {},
      avatarUrl: "https://i.pravatar.cc/50"
    },
    currentLesson: null,
    audioPlayers: new Map(),
    tokenRefreshTimer: null
  };

  // DOM Elements
  const elements = {
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    mainApp: document.getElementById('mainApp'),
    userNameInput: document.getElementById('userName'),
    passwordInput: document.getElementById('password'),
    registerUserName: document.getElementById('registerUserName'),
    registerPassword: document.getElementById('registerPassword'),
    displayName: document.getElementById('displayName'),
    userAvatarImg: document.getElementById('userAvatarImg'),
    logoutBtn: document.getElementById('logoutBtn'),
    lessonTitle: document.getElementById('lesson-title'),
    lessonContent: document.getElementById('lesson-content'),
    progressPercentage: document.querySelector('.percentage'),
    progressCircle: document.querySelector('.progress'),
    continueBtn: document.querySelector('.continue'),
    progressWarning: document.querySelector('.progress-warning'),
    daysContainer: document.querySelector('.days')
  };

  // Initialize the application
  init();

  // Core Functions
  function init() {
    checkAuthState();
    setupEventListeners();
    if (appState.user) {
      loadLessons();
    }
  }

  async function checkAuthState() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && refreshToken && user) {
      try {
        const isValid = await verifyToken(token);
        if (isValid) {
          appState.token = token;
          appState.refreshToken = refreshToken;
          appState.user = user;
          appState.userProgress = {
            ...appState.userProgress,
            ...user
          };
          completeLoginUI();
          startTokenRefreshTimer();
          return;
        }
      } catch (error) {
        console.error('Token verification failed:', error);
      }
    }
    showLoginForm();
  }

  async function verifyToken(token) {
    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  function setupEventListeners() {
    // Auth Forms
    document.getElementById('submitName').addEventListener('click', handleLogin);
    document.getElementById('submitRegister').addEventListener('click', handleRegister);
    document.getElementById('registerLink').addEventListener('click', showRegisterForm);
    document.getElementById('loginLink').addEventListener('click', showLoginForm);
    elements.logoutBtn.addEventListener('click', handleLogout);

    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', handleNavClick);
    });

    // Lesson Navigation
    elements.continueBtn.addEventListener('click', handleContinueLesson);
  }

  // Authentication Functions
  async function handleLogin(e) {
    e.preventDefault();
    
    const username = elements.userNameInput.value.trim();
    const password = elements.passwordInput.value.trim();
    const avatarFile = document.getElementById('avatarUpload').files[0];

    if (!username || !password) {
      showAlert('Please enter both username and password');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Update app state
      appState.user = data.user;
      appState.token = data.token;
      appState.refreshToken = data.refreshToken;
      appState.userProgress = {
        ...appState.userProgress,
        ...data.user
      };

      // Save to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      completeLoginUI();
      startTokenRefreshTimer();
    } catch (error) {
      showAlert(error.message);
      console.error('Login error:', error);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    
    const username = elements.registerUserName.value.trim();
    const password = elements.registerPassword.value.trim();
    const avatarFile = document.getElementById('registerAvatarUpload').files[0];

    if (!username || !password) {
      showAlert('Please enter both username and password');
      return;
    }

    if (password.length < config.minPasswordLength) {
      showAlert(`Password must be at least ${config.minPasswordLength} characters`);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const response = await fetch(`${config.apiBaseUrl}/auth/register`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      showAlert('Registration successful! Please login.', 'success');
      showLoginForm();
    } catch (error) {
      showAlert(error.message);
      console.error('Registration error:', error);
    }
  }

  async function handleLogout() {
    try {
      await fetch(`${config.apiBaseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${appState.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken: appState.refreshToken })
      });

      // Clear app state
      appState.user = null;
      appState.token = null;
      appState.refreshToken = null;
      clearTokenRefreshTimer();

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      // Reset UI
      showLoginForm();
      stopAllAudioPlayers();
    } catch (error) {
      console.error('Logout error:', error);
      showAlert('Error during logout');
    }
  }

  // Token Management
  function startTokenRefreshTimer() {
    clearTokenRefreshTimer();
    appState.tokenRefreshTimer = setInterval(async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refreshToken: appState.refreshToken })
        });

        const data = await response.json();

        if (response.ok) {
          appState.token = data.token;
          localStorage.setItem('token', data.token);
        } else {
          throw new Error(data.message || 'Token refresh failed');
        }
      } catch (error) {
        console.error('Token refresh error:', error);
        handleLogout();
      }
    }, config.tokenRefreshInterval);
  }

  function clearTokenRefreshTimer() {
    if (appState.tokenRefreshTimer) {
      clearInterval(appState.tokenRefreshTimer);
      appState.tokenRefreshTimer = null;
    }
  }

  // Lesson Management
  function loadLessons() {
    elements.daysContainer.innerHTML = '';
    
    lessonsData.forEach((lesson, index) => {
      const dayElement = document.createElement('div');
      dayElement.className = 'day';
      dayElement.dataset.day = lesson.day;
      if (index === 0) dayElement.classList.add('active');
      dayElement.innerHTML = `Day ${lesson.day}`;
      dayElement.addEventListener('click', () => {
        document.querySelectorAll('.day').forEach(d => d.classList.remove('active'));
        dayElement.classList.add('active');
        loadLesson(lesson.day);
      });
      elements.daysContainer.appendChild(dayElement);
    });

    if (lessonsData.length > 0) {
      loadLesson(1);
    }
  }

  async function loadLesson(dayNumber) {
    const lesson = lessonsData.find(l => l.day === dayNumber) || {
      day: dayNumber,
      title: `Lesson ${dayNumber}`,
      audio: "",
      duration: "45 min",
      level: "Beginner",
      description: "Lesson content will be available soon."
    };

    appState.currentLesson = lesson;

    // Update lesson info
    elements.lessonTitle.textContent = lesson.title;
    document.querySelector('.details').textContent = `⏱️ ${lesson.duration} • 🧩 ${lesson.level}`;

    // Create lesson content
    const audioHTML = lesson.audio ? createAudioPlayerHTML(lesson) : '<p class="no-audio">Audio not available for this lesson</p>';
    const videoHTML = lesson.video ? createVideoHTML(lesson) : '';

    elements.lessonContent.innerHTML = `
      ${audioHTML}
      ${videoHTML}
      <div class="lesson-description">
        <p>${lesson.description}</p>
        ${lesson.text || ''}
      </div>
    `;

    // Add DOCX file section for lesson 26
    if (dayNumber === 26) {
      elements.lessonContent.innerHTML += `
        <div class="docx-lesson">
          <h3>Asilimia Za Mkonga Wako Kusimama</h3>
          <p>Download the DOCX file for additional information:</p>
          <a href="wazimu/Lesson 6.5---Asilimia Za Mkonga Kusimama.docx" download>Download DOCX</a>
        </div>
      `;
    }

    // Initialize audio player
    if (lesson.audio) {
      initAudioPlayer(dayNumber);
    }

    // Update progress
    updateUserProgress(dayNumber);
  }

  function createAudioPlayerHTML(lesson) {
    return `
      <div class="audio-player-container" data-lesson-id="${lesson.day}">
        <audio controls class="lesson-audio" id="lesson-audio-${lesson.day}" style="width:100%">
          <source src="${lesson.audio}" type="audio/ogg; codecs=opus">
        </audio>
        <div class="audio-progress">
          <span style="color: #aaa;">Listened:</span>
          <span id="audio-progress-text-${lesson.day}" style="color: #b4ff39; font-weight: bold;">
            ${appState.userProgress.lessonProgress[lesson.day] || 0}%
          </span>
        </div>
      </div>
    `;
  }

  function createVideoHTML(lesson) {
    return `
      <div class="video-container">
        <iframe src="${lesson.video}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
      </div>
    `;
  }

  function initAudioPlayer(dayNumber) {
    const audioElement = document.getElementById(`lesson-audio-${dayNumber}`);
    if (!audioElement) return;

    // Stop any currently playing audio
    stopAllAudioPlayers();

    // Store reference to audio element
    appState.audioPlayers.set(dayNumber, audioElement);

    // Initialize progress tracking
    if (!appState.userProgress.lessonProgress[dayNumber]) {
      appState.userProgress.lessonProgress[dayNumber] = 0;
    }

    audioElement.addEventListener('timeupdate', () => {
      updateAudioProgress(dayNumber, audioElement);
    });

    audioElement.addEventListener('ended', () => {
      markLessonCompleted(dayNumber);
    });

    // Try to play automatically (muted to avoid autoplay restrictions)
    audioElement.muted = true;
    const playPromise = audioElement.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        audioElement.muted = false;
        audioElement.controls = true;
      }).then(() => {
        audioElement.muted = false;
      });
    }
  }

  function updateAudioProgress(dayNumber, audioElement) {
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration || 1;
    const progress = Math.round((currentTime / duration) * 100);

    // Update display
    const progressText = document.getElementById(`audio-progress-text-${dayNumber}`);
    if (progressText) {
      progressText.textContent = `${progress}%`;
    }

    // Update state if progress increased
    if (progress > appState.userProgress.lessonProgress[dayNumber]) {
      appState.userProgress.lessonProgress[dayNumber] = progress;
      saveUserProgress();
    }
  }

  function stopAllAudioPlayers() {
    appState.audioPlayers.forEach(audio => {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    appState.audioPlayers.clear();
  }

  // Progress Tracking
  async function updateUserProgress(dayNumber) {
    appState.userProgress.lastAccessed = dayNumber;
    await saveUserProgress();
    updateProgressDisplay();
  }

  async function saveUserProgress() {
    try {
      const response = await fetch(`${config.apiBaseUrl}/user/progress`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${appState.token}`
        },
        body: JSON.stringify({ 
          completedLessons: appState.userProgress.completedLessons,
          lessonProgress: appState.userProgress.lessonProgress,
          lastAccessed: appState.userProgress.lastAccessed
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Update local storage with new progress data
        const updatedUser = {
          ...appState.user,
          completedLessons: data.completedLessons,
          lessonProgress: data.lessonProgress,
          lastAccessed: data.lastAccessed
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        appState.user = updatedUser;
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  function calculateOverallProgress() {
    const totalLessons = lessonsData.length;
    const completedCount = appState.userProgress.completedLessons.length;
    return Math.round((completedCount / totalLessons) * 100);
  }

  function updateProgressDisplay() {
    const progress = calculateOverallProgress();
    elements.progressPercentage.textContent = `${progress}%`;

    // Update progress circle
    const circumference = 188.4;
    const offset = circumference - (progress / 100) * circumference;
    elements.progressCircle.style.strokeDashoffset = offset;
  }

  async function markLessonCompleted(dayNumber) {
    if (!appState.userProgress.completedLessons.includes(dayNumber)) {
      appState.userProgress.completedLessons.push(dayNumber);
      await saveUserProgress();
      updateProgressDisplay();
    }
  }

  function canProceedToNextLesson(dayNumber) {
    const lesson = lessonsData.find(l => l.day === dayNumber);
    if (!lesson?.audio) return true;

    const progress = appState.userProgress.lessonProgress[dayNumber] || 0;
    return progress >= config.progressThreshold || 
           appState.userProgress.completedLessons.includes(dayNumber);
  }

  // Navigation
  async function handleContinueLesson() {
    const currentActive = document.querySelector('.day.active');
    if (!currentActive) return;

    const currentDay = parseInt(currentActive.dataset.day);

    if (!canProceedToNextLesson(currentDay)) {
      elements.progressWarning.style.display = 'block';
      setTimeout(() => {
        elements.progressWarning.style.display = 'none';
      }, 3000);
      return;
    }

    elements.progressWarning.style.display = 'none';
    const nextDay = currentDay + 1;

    if (nextDay <= lessonsData.length) {
      const nextDayElement = document.querySelector(`.day[data-day="${nextDay}"]`);
      if (nextDayElement) {
        currentActive.classList.remove('active');
        nextDayElement.classList.add('active');
        await loadLesson(nextDay);

        // Scroll to make the next day visible
        nextDayElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    } else {
      showAlert("You've completed all available lessons!", 'success');
    }
  }

  function handleNavClick(e) {
    const target = this.dataset.target;

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    this.classList.add('active');

    // Show/hide sections based on navigation
    if (target === 'account') {
      document.querySelector('.account-section').style.display = 'block';
      document.querySelector('.my-activity').style.display = 'none';
      document.querySelector('.training-plan').style.display = 'none';
    } else {
      document.querySelector('.account-section').style.display = 'none';
      document.querySelector('.my-activity').style.display = 'block';
      document.querySelector('.training-plan').style.display = 'block';
    }
  }

  // UI Functions
  function completeLoginUI() {
    elements.displayName.textContent = appState.user.username;
    elements.userAvatarImg.src = appState.user.avatarUrl;
    elements.loginForm.style.display = 'none';
    elements.registerForm.style.display = 'none';
    elements.mainApp.style.display = 'block';
    loadLessons();
  }

  function showLoginForm() {
    elements.loginForm.style.display = 'block';
    elements.registerForm.style.display = 'none';
    elements.mainApp.style.display = 'none';
    elements.userNameInput.value = '';
    elements.passwordInput.value = '';
    document.getElementById('avatarUpload').value = '';
  }

  function showRegisterForm() {
    elements.loginForm.style.display = 'none';
    elements.registerForm.style.display = 'block';
    elements.mainApp.style.display = 'none';
    elements.registerUserName.value = '';
    elements.registerPassword.value = '';
    document.getElementById('registerAvatarUpload').value = '';
  }

  function showAlert(message, type = 'error') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type}`;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  }

  // Lesson data (keep your existing lessonsData array here)
  const lessonsData = [
    // ... your existing lessons data ...
    {
    day: 1,
    title: "MTIE Wazimu Mkeo",
    audio: "wazimu/Lesson Intoduction---MTIE Wazimu Mkeo.opus",
    duration: "4 min",
    level: "Utangulizi [Intro]",
    description: "Hii Ni Program Ambayo Itamfanya Mke Wako, Mpenzi Wako, Demu Wako Atamani Kushiriki Tendo la Ndoa Na Wewe TU Kila Wakati.. Yaani Akutake Tena Na Tena😀😀"
  },
  {
    day: 2,
    title: "Hatua Ya Malengo",
    audio: "wazimu/Lesson 1.0---1.1Malengo.opus",
    duration: "4 min",
    level: "Sehemu Ya Kwanza-- Hatua Ya 1",
    description: `
      <div class="lesson-description">
        <p>Jinsi Ya Kuset Malengo Yenye Uhalisia Kwenye Tendo La Ndoa Na Jinsi Ya Kuyatimiza Malengo Hayo.Jibu Maswali [Hapo Chini👇] Baada YA Kusikiliza Audio Hiyo Hapo Juu</p>
      </div>

      <div class="assignment-box">
        <div class="assignment-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#b4ff39">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
          <h4>Maswali Ya Kuweka Malengo</h4>
        </div>
        <div class="assignment-content">
          <p class="instruction">Jibu maswali yafuatayo kwa uangalifu kwenye daftari lako:</p>
          <ol class="assignment-questions">
            <li>
              <span class="question-number">1.</span>
              <span class="question-text">Unatamani kuona nini kunatokea kwenye Mahusiano Yako?</span>
            </li>
            <li>
              <span class="question-number">2.</span>
              <span class="question-text">Unatamani Mke Wako akuchukuliaje?</span>
            </li>
            <li>
              <span class="question-number">3.</span>
              <span class="question-text">Unatamani Performance yako Iweje Kwa Bed?</span>
            </li>
            <li>
              <span class="question-number">4.</span>
              <span class="question-text">Mambo gani Unatakiwa Kuzingatia au Kufanya Ili Utimize Maono yako Haya?</span>
            </li>
          </ol>
          <div class="solution-box">
            <p>🔑 <span class="highlight">Suluhisho:</span> MTIE Wazimu</p>
          </div>
        </div>
        <!-- Add the new audio lesson here -->
        <div class="additional-lesson">
          <h4>Baada Ya Kujibu Maswali Hayo..👇</h4>
          <audio controls>
            <source src="wazimu/Lesson 1.2---Baada ya Kujibu.opus" type="audio/ogg; codecs=opus">
            Your browser does not support the audio element.
          </audio>
        </div>

        <!-- New audio lesson -->
        <div class="additional-lesson">
          <h4>Mfano Halisi Ya Kuandika Malengo Yako</h4>
          <audio controls>
            <source src="wazimu/Lesson 1.3---Mfano Halisi wa Malengo.opus" type="audio/ogg; codecs=opus">
            Your browser does not support the audio element.
          </audio>
        </div>

        <!-- WhatsApp Button -->
        <a href="https://wa.me/255655889126?text=Malengo%20Yangu%20Ni:%20[Share%20Na%20Mimi%20Malengo%20Yako]" class="whatsapp-button">
          <span class="whatsapp-icon">📱</span>
          Share Malengo Yako
        </a>
      </div>

      <style>
        .assignment-box {
          background: #2a2a2d;
          border-radius: 12px;
          margin: 20px 0;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: max-height 0.3s ease-out;
          max-height: 60px;
          overflow: hidden;
        }

        .assignment-box.expanded {
          max-height: 1000px;
        }

        .assignment-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px;
          background: rgba(180, 255, 57, 0.1);
          border-bottom: 1px solid #3a3a3d;
          cursor: pointer;
        }

        .assignment-header h4 {
          margin: 0;
          color: #b4ff39;
          font-size: 1rem;
        }

        .assignment-content {
          padding: 15px;
        }

        .instruction {
          color: #aaa;
          font-size: 0.85rem;
          margin-bottom: 15px;
        }

        .assignment-questions {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .assignment-questions li {
          display: flex;
          gap: 8px;
          padding: 10px 0;
          border-bottom: 1px dashed #3a3a3d;
          align-items: flex-start;
        }

        .assignment-questions li:last-child {
          border-bottom: none;
        }

        .question-number {
          color: #b4ff39;
          font-weight: bold;
          min-width: 20px;
        }

        .question-text {
          flex: 1;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .solution-box {
          margin-top: 15px;
          padding: 12px;
          background: rgba(180, 255, 57, 0.05);
          border-radius: 8px;
          text-align: center;
          border: 1px dashed rgba(180, 255, 57, 0.3);
        }

        .solution-box p {
          margin: 0;
          font-size: 0.9rem;
        }

        .highlight {
          color: #b4ff39;
          font-weight: bold;
        }

        .additional-lesson {
          margin-top: 20px;
          padding: 15px;
          background: #2a2a2d;
          border-radius: 12px;
        }

        .additional-lesson h4 {
          color: #b4ff39;
          margin-bottom: 10px;
        }

        .additional-lesson audio {
          width: 100%;
        }

        .whatsapp-button {
          background-color: #25D366;
          color: white;
          border: none;
          border-radius: 25px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20px auto;
          width: 90%;
          max-width: 300px;
          text-decoration: none;
          transition: background-color 0.3s;
        }

        .whatsapp-button:hover {
          background-color: #128C7E;
        }

        .whatsapp-icon {
          margin-right: 10px;
          font-size: 20px;
        }
      </style>
    `
  },
  {
    day: 3,
    title: "Mindset ya AlphaMan",
    audio: "wazimu/Lesson 2.0---1.2 Mindset ya Alpha Man.opus",
    duration: "09 min",
    level: "Sehemu Ya Kwanza-- Hatua Ya 2",
    description: "Fahamu Kuhusu Mindset Ya Mwanaume Rijali NA Jinsi Ya Kujenga Mindset[Mtazamo] Chanya[Postive Mindset]."
  },
  {
    day: 4,
    title: "Kujenga Mtazamo Chanya, Kujikubali [Affirmation]",
    audio: "wazimu/Lesson 2.1---1.3 Affirmation.opus",
    duration: "10 min",
    level: "Sehemu Ya Kwanza-- Hatua Ya 3",
    description: "Hapa Utajifunza Jinsi Ya KUjenga Mtazamo Chanya Juu Na Kuanza Kujikubali Mwenyewe Na Kujiambia Maneno Mazuri"
  },
  {
    day: 5,
    title: "Muandae Mwanamke Wako Kisaikolojia",
    audio: "wazimu/Lesson 3.0---2.Muandae Mkeo Kisaikolojia.opus",
    duration: "2 min",
    level: "Sehemu Ya Pili",
    description: "Hapa Utafahamu Mipaka Ya Mkeo Katika Tendo La Ndoa, MAeneo Ya Kumgusa Ili Ainjoi Zaidi, Na Makosa Ambayo Hutakiwi Kufanya Kwenye Tendo."
  },
  {
    day: 6,
    title: "Fahamu Mipaka ya Mkeo Katika Tendo La Ndoa",
    audio: "wazimu/Lesson-3. Fahamu-Mipaka-na-Mkeo-Katika-Tendo-La-Ndoa.opus",
    duration: "4 min",
    level: "Sehemu Ya Pili-- Hatua Ya 1",
    description: "Heshimu Hisia, Ridhaa Na Mahitaji Ya Mkeo Katika Tendo La Ndoa Ili Kujenga Uhusiano Wa Upendo, Usalama Na Maelewano Ndani Ya Ndoa."
  },
  {
    day: 7,
    title: "Makosa Saba [7] Ya Wanaume Kitandani Yanayowapunguzia Marks",
    audio: "wazimu/Lesson-3.2-2.2_-Makosa-Saba_-7-ya-Wanaume-Kitandani.opus",
    duration: "09 min",
    level: "Sehemu Ya Pili-- Hatua Ya 2",
    description: "Haya Ni Makosa Ya Common Ambayo Wanaume Hufanya Wakati Wa Tendo La Ndoa, Yanayoweza Kuwafanya Waonekane Hawaridhishi Au Hawajali Hisia Za Wenza Wao, Na Hivyo Kupunguza Mvuto Na Furaha Katika Mahusiano Ya Ndoa."
  },
  {
    day: 8,
    title: "Maeneo Kumi na Saba, 17 Yenye Kumsisimua Mwanamke",
    audio: "wazimu/Lesson-3.3-2.3_-Maeneo-17-Yenye-Msisimko-Mkali.opus",
    duration: "10 min",
    level: "Sehemu Ya Pili-- Hatua Ya 3",
    description: "Haya Ni Maeneo Nyeti Kwenye Mwili Wa Mwanamke Ambayo Yakiguswa Kwa Upendo Na Ustadi Huongeza Msisimko, Hamu Ya Tendo La Ndoa, Na Kumsaidia Kufurahia Mahusiano Ya Kimapenzi Kwa Kiwango Cha Juu Zaidi."
  },
  {
    day: 9,
    title: "Muandae Mwanamke Kisaikolojia, Anza Mapema",
    audio: "wazimu/Lesson-3.4-2.4-Muandae-Mwanamke-Kisaikolojia_-Anza-Mapema..opus",
    duration: "10 min",
    level: "Sehemu Ya Pili-- Hatua Ya 4",
    description: "Ukaribu Wa Kimapenzi Kwa Mwanamke Huanza Kichwani Kabla Ya Kitandani; Mtoe Stress, Mpe Maneno Matamu, Na Mtengee Muda Ili Ajisikie Salama Na Kupokea Tendo Kwa Moyo Wote."
  },
  {
    day: 10,
    title: "Mambo Nane, 8 Ya Kumtia Wazimu Kitandani",
    audio: "wazimu/Lesson-4.0-Mambo-8-ya-Kutia-Wazimu-Kitandani.opus",
    duration: "10 min",
    level: "Sehemu Ya Tatu-- Hatua Ya 1",
    description: "Hizi Ni Mbinu Na Vitendo Vya Kimapenzi Vinavyoweza Kumvutia Na Kumridhisha Mwanamke Kwa Kiwango Cha Juu, Vikimfanya Ahisi Kupendwa, Kuthaminiwa Na Kushiriki Tendo La Ndoa Kwa Hamasa Na Furaha Kubwa."
  },
  {
    day: 11,
    title: "Minyaminya Kimahaba",
    audio: "wazimu/Lesson-4.1-3.2A_-Minyaminya-Kimahaba.opus",
    duration: "10 min",
    level: "Sehemu Ya Tatu-- Hatua Ya 2A",
    description: "Jifunze Namna Ya Kumuandaa Mwenza Wako, Kumminyaminya Kimahaba."
  },
  {
    day: 12,
    title: "Maeneo Ya Minyaminya Na Kumsisimua Mke Wako",
    audio: "wazimu/Lesson 4.2---3.2B Maeneo Ya Kuminya Na Kumsisimua.opus",
    duration: "10 min",
    level: "Sehemu Ya Tatu-- Hatua Ya 2B",
    description: "Jifunze Maeneo Gani Hasa Yanamfanya Mwanamke Ainjoi Zaidi Kuminywaminywa, Kukandwakandwa."
  },
  {
    day: 13,
    title: "Sanaa Ya Kumgusa Na Kumpapasa Mkeo",
    audio: "wazimu/Lesson-4.4-3.3-Sanaa-ya-Mguso-Na-Mpapaso.opus",
    duration: "08 min",
    level: "Sehemu Ya Tatu-- Hatua Ya 3A",
    description: "Ustadi Wa Kutumia Mguso Wa Upendo Kuamsha Hisia Za Kimapenzi Kwa Utaratibu, Heshima Na Uelewa, Ili Kumjenga Kisaikolojia Na Kimwili Kabla Ya Tendo La Ndoa."
  },
  {
    day: 14,
    title: "Sanaa Ya Kumgusa Na Kumpapasa Kwa Kutumia Mkonga Wako",
    audio: "wazimu/Lesson 4.3---3.3 Sanaa ya Mguso Na Mpapaso Kwa Mkonga.opus",
    duration: "07 min",
    level: "Sehemu Ya Tatu-- Hatua Ya 3B",
    description: "Discover how to style your web pages with CSS. Learn about selectors, properties, and layouts."
  },
  {
    day: 15,
    title: "Jinsi Ya Kufanya Madoido Kwenye Kisimi",
    audio: "wazimu/Lesson-4.5-3.4-Madoido-Kwenye-Kisimi.opus",
    duration: "04 min",
    level: "Sehemu Ya Tatu-- Hatua Ya 4",
    description: "Discover how to style your web pages with CSS. Learn about selectors, properties, and layouts."
  },
  {
    day: 16,
    title: "Furahia Utamu Wa G-Spot",
    audio: "wazimu/Lesson 4.6---3.5 Furahia Utamu wa G-spot.opus",
    duration: "09 min",
    level: "Sehemu Ya Tatu-- Hatua Ya 5A",
    description: "Discover how to style your web pages with CSS. Learn about selectors, properties, and layouts."
  },
  {
    day: 17,
    title: "G-Spot, Kisimi Na Style Ya Ajabu Zaidi",
    audio: "wazimu/Lesson 4.7---3.5b_ G-spot, kisimi na Mikao wild.opus",
    duration: "05 min",
    level: "Sehemu Ya Tatu-- Hatua Ya 5B",
    description: "Discover how to style your web pages with CSS. Learn about selectors, properties, and layouts."
  },
  {
    day: 18,
    title: "Style [Mikao] Ambayo Ni Mitamu Zaidi Kwenye Kula Uroda😊😊",
    audio: "wazimu/Lesson 4.8.---3.6A Mikao Mitamu Ya Kula Uroda.opus",
    duration: "07 min",
    level: "Sehemu Ya Tatu-- Hatua Ya 6A",
    description: "Discover how to style your web pages with CSS. Learn about selectors, properties, and layouts."
  },
  {
    day: 19,
    title: "Style [Mikao] Ambayo Ni Mitamu Zaidi Kwenye Kula Uroda- Sehemu Ya Pili😊😊",
    audio: "wazimu/Lesson 4.8.1---3.6B Mikao 3.opus",
    duration: "08 min",
    level: "Sehemu Ya Tatu-- Hatua Ya 6B",
    description: "Discover how to style your web pages with CSS. Learn about selectors, properties, and layouts."
  },
  {
    day: 20,
    title: "Lishe, Virutubisho Na Mazoezi😊😊",
    audio: "wazimu/Lesson 5.0---Hatua 4_ Lishe, Virutubisho na Mazoezi_1.opus",
    duration: "02 min",
    level: "Sehemu Ya Nne",
    description: "Discover how to style your web pages with CSS. Learn about selectors, properties, and layouts."
  },
  {
    day: 21,
    title: "Vyakula Pamoja Na Makundi Ya Damu🩸🅰️🆎🅱️🅾️",
    audio: "wazimu/Lesson 5.1---Hatua 4A_ Vyakula Pamoja Na Makundi Ya Damu. _1.opus",
    duration: "07 min",
    level: "Sehemu Ya Nne-- A",
    description: "Discover how to style your web pages with CSS. Learn about selectors, properties, and layouts."
  },
  {
    day: 22,
    title: "Faida Ya Kutumia Dawa/Supplements",
    audio: "wazimu/Lesson 5--- Suppliments.opus",
    duration: "09 min",
    level: "Sehemu Ya Nne-- B",
    description: "Discover how to style your web pages with CSS. Learn about selectors, properties, and layouts."
  },
  {
    day: 23,
    title: "Mazoezi Ya Kuongea Stamina Na Kukaza Misuli Ya Mashine Yako.🥒🍆",
    audio: "wazimu/Lesson 5.3---Hatua 4C_ Mazoezi Kuimarisha Stamina.opus",
    duration: "05 min",
    level: "Sehemu Ya Nne-- C",
    description: "Discover how to style your web pages with CSS. Learn about selectors, properties, and layouts.",
    video: "https://www.youtube.com/embed/9tMiVgX2hdo",
    text: "<p class='progress-indicator'>Mazoezi Ya Kegel <br>Endelea Na Masomo Kufahamu Zaidi Kuhusiana Na Mazooezi Ya Uume.</br></p>"
  },
  {
    day: 24,
    title: "Mazoezi Ya Kegels",
    audio: "wazimu/Lesson 6.1---Zoezi La Kegel.opus",
    duration: "03 min",
    level: "Sehemu Ya Nne-- Mazoezi Ya Kegels",
    description: "Discover how to style your web pages with CSS. Learn about selectors, properties, and layouts."
  },
  {
    day: 25,
    title: "Zoezi La Kwanza La Kegels",
    audio: "wazimu/Lesson 6.2--- Zoezi La Kwanza La Kegel.opus",
    duration: "05 min",
    level: "Sehemu Ya Nne-- Mazoezi Ya Kegels",
    description: "Discover how to style your web pages with CSS. Learn about selectors, properties, and layouts."
  },
  {
    day: 26,
    title: "Mazoezi Ya Mkonga",
    audio: "", // No main audio
    duration: "09 min", // 6 + 3 minutes
    level: "Sehemu Ya Nne-- Mazoezi Ya Kegels",
    description: "Mazoezi mbalimbali ya mkonga",
    text: `
        <div class="sub-lesson">
            <h3>Jinsi Ya Kufanya Mkonga Warm-Up</h3>
            <audio controls>
                <source src="wazimu/Lesson 6.3---Mkonga Warm Up.opus" type="audio/ogg; codecs=opus">
            </audio>
            <p class="duration">⏱️ 06 min</p>
            <p>Mazoezi Ya Kuongeza Nguvu, Urefu Na Unene Wa Mkonga Wako.</p>
        </div>

        <div class="sub-lesson">
            <h3>Kiasi Cha Kusimamisha Mkonga Wako</h3>
            <audio controls>
                <source src="wazimu/Lesson 6.4--- Kiasi Cha Kusimama Kwa Mkonga.opus" type="audio/ogg; codecs=opus">
            </audio>
            <p class="duration">⏱️ 03 min</p>
            <p>Maelezo ya kiasi cha kusimamisha mkonga wako.</p>
        </div>

        <style>
            .sub-lesson {
                margin-bottom: 2rem;
                padding-bottom: 1.5rem;
                border-bottom: 1px solid #3a3a3d;
            }
            .sub-lesson:last-child { border-bottom: none; }
            .sub-lesson h3 { color: #b4ff39; margin-bottom: 0.5rem; }
            .sub-lesson .duration { color: #aaa; margin: 0.5rem 0; }
        </style>
    `
  },
  {
    day: 27,
    title: "Kiasi Cha Kusimamisha Mkonga Wako",
    audio: "wazimu/Lesson 6.4--- Kiasi Cha Kusimama Kwa Mkonga.opus",
    duration: "03 min",
    level: "Sehemu Ya Nne-- Mazoezi Ya Kegels",
    description: "Maelezo ya kiasi cha kusimamisha mkonga wako."
  },
  {
    day: 28,
    title: "Asilimia Za Mkonga Wako Kusimama",
    audio: "wazimu/Lesson 6.4--- Kiasi Cha Kusimama Kwa Mkonga.opus",
    duration: "03 min",
    level: "Sehemu Ya Nne-- Mazoezi Ya Kegels",
    description: "Kuna Docx Hapa Ya Kuweka."
  }
  ];
});
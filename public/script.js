// Lesson data - replace with your actual lessons
const lessonsData = [
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
  // ... (keep all your existing lesson data objects exactly as they are)
];

// Fill in remaining days with placeholder lessons
for (let i = lessonsData.length + 1; i <= 30; i++) {
  lessonsData.push({
    day: i,
    title: `Lesson ${i}`,
    audio: "",
    duration: `${40 + i} min`,
    level: i > 15 ? "Intermediate" : "Beginner",
    description: `This is the content for lesson ${i}. Details will be added soon.`
  });
}

// User progress tracking - will be initialized from server data
let userProgress = {
  completedLessons: [],
  lastAccessed: null,
  lessonProgress: {},
  avatarUrl: "https://i.pravatar.cc/50"
};

// Audio progress tracking
let audioProgress = {
  currentTime: 0,
  duration: 1,
  hasPlayed: false,
  playedRanges: [],
  lastUpdateTime: 0
};

// Track currently playing audio
let currentlyPlayingAudio = null;

// Function to stop the currently playing audio
function stopCurrentlyPlayingAudio() {
  if (currentlyPlayingAudio && !currentlyPlayingAudio.paused) {
    currentlyPlayingAudio.pause();
    currentlyPlayingAudio.currentTime = 0;
  }
}

// Initialize from server
async function initUserProgress() {
  const token = localStorage.getItem('token');
  const savedUser = localStorage.getItem('user');
  
  if (token && savedUser) {
    try {
      const response = await fetch('https://kayani-program.onrender.com/api/user/progress', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        const user = JSON.parse(savedUser);
        
        userProgress = {
          completedLessons: data.completedLessons || [],
          lastAccessed: data.lastAccessed || null,
          lessonProgress: data.lessonProgress || {},
          avatarUrl: user.avatarUrl || "https://i.pravatar.cc/50"
        };
        
        document.getElementById('userAvatarImg').src = userProgress.avatarUrl;
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  }
}

// Save progress to server
async function saveUserProgress() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (token && user) {
    try {
      const response = await fetch('https://kayani-program.onrender.com/api/user/progress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          completedLessons: userProgress.completedLessons,
          lessonProgress: userProgress.lessonProgress,
          lastAccessed: userProgress.lastAccessed
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // Update local storage with new progress data
        const updatedUser = {
          ...user,
          completedLessons: data.completedLessons,
          lessonProgress: data.lessonProgress,
          lastAccessed: data.lastAccessed
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }
}

// Calculate overall progress
function calculateOverallProgress() {
  const totalLessons = lessonsData.length;
  const completedCount = userProgress.completedLessons.length;
  return Math.round((completedCount / totalLessons) * 100);
}

// Update progress display
function updateProgressDisplay() {
  const progress = calculateOverallProgress();
  document.querySelector('.percentage').textContent = `${progress}%`;

  // Update progress circle
  const circumference = 188.4;
  const offset = circumference - (progress / 100) * circumference;
  document.querySelector('.progress').style.strokeDashoffset = offset;
}

// Helper function to convert image to base64
function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

// Update UI after successful login
function completeLoginUI(user) {
  document.getElementById('displayName').textContent = user.username;
  document.getElementById('userAvatarImg').src = user.avatarUrl;
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('mainApp').style.display = 'block';
  
  // Initialize user progress from server data
  userProgress = {
    completedLessons: user.completedLessons || [],
    lastAccessed: user.lastAccessed || null,
    lessonProgress: user.lessonProgress || {},
    avatarUrl: user.avatarUrl
  };
  
  // Set up logout button
  document.getElementById('logoutBtn').addEventListener('click', logout);
  
  updateProgressDisplay();
}

// Handle registration form submission
document.getElementById('submitRegister').addEventListener('click', async function() {
  const userName = document.getElementById('registerUserName').value.trim();
  const password = document.getElementById('registerPassword').value.trim();
  const avatarFile = document.getElementById('registerAvatarUpload').files[0];

  if (userName && password) {
    try {
      let avatarUrl = "https://i.pravatar.cc/50";
      
      if (avatarFile) {
        avatarUrl = await convertImageToBase64(avatarFile);
      }
      
    const response = await fetch('https://kayani-program.onrender.com/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: userName, password, avatarUrl }),
          });
      
      const data = await response.json();
      
      if (response.ok) {
        alert(data.message || 'Registration successful! Please login.');
        // Switch to login form instead of logging in
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration');
    }
  }
});

// Handle user login
document.getElementById('submitName').addEventListener('click', async function() {
  const userName = document.getElementById('userName').value.trim();
  const password = document.getElementById('password').value.trim();
  // const avatarFile = document.getElementById('avatarUpload').files[0];

  if (userName && password) {
    try {
      let avatarUrl = "https://i.pravatar.cc/50";
      
       
      const response = await fetch('https://kayani-program.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName, password, avatarUrl }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        completeLoginUI(data.user);
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login');
    }
  }
});

// Logout function
async function logout() {
  try {
    // No need to call backend logout

    // Clear client-side storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Reset UI
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';

    // Clear form fields
    document.getElementById('userName').value = '';
    document.getElementById('password').value = '';

    // Reset progress tracking
    userProgress = {
      completedLessons: [],
      lastAccessed: null,
      lessonProgress: {},
      avatarUrl: "https://i.pravatar.cc/50"
    };

    // Stop any playing audio
    stopCurrentlyPlayingAudio();

  } catch (error) {
    console.error('Logout error:', error); // optional, or just remove
  }
}


// Add event listener for logout button
window.addEventListener('DOMContentLoaded', async function() {
  const savedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  
  if (savedUser && token) {
    const user = JSON.parse(savedUser);
    completeLoginUI(user);
    await initUserProgress();
  } else {
    // Show login form if not logged in
    document.getElementById('loginForm').style.display = 'block';
  }

  // Generate days 1-30
  const daysContainer = document.querySelector('.days');
  lessonsData.forEach((lesson, index) => {
    const dayElement = document.createElement('div');
    dayElement.className = 'day';
    dayElement.dataset.day = lesson.day;
    if (index === 0) dayElement.classList.add('active');
    dayElement.innerHTML = `Day ${lesson.day}`;
    dayElement.addEventListener('click', function() {
      document.querySelectorAll('.day').forEach(d => d.classList.remove('active'));
      this.classList.add('active');
      loadLesson(lesson.day);
    });
    daysContainer.appendChild(dayElement);
  });

  // Load first lesson
  if (lessonsData.length > 0) {
    loadLesson(1);
  }

  // Add event listeners to all audio elements
  document.addEventListener('play', function(e) {
    if (e.target.tagName === 'AUDIO') {
      if (currentlyPlayingAudio && currentlyPlayingAudio !== e.target) {
        stopCurrentlyPlayingAudio();
      }
      currentlyPlayingAudio = e.target;
    }
  }, true);
});

function loadLesson(dayNumber) {
  const lesson = lessonsData.find(l => l.day === dayNumber) || {
    day: dayNumber,
    title: `Lesson ${dayNumber}`,
    audio: "",
    duration: "45 min",
    level: "Beginner",
    description: "Lesson content will be available soon."
  };

  // Update lesson info
  document.getElementById('lesson-title').textContent = lesson.title;
  document.querySelector('.details').textContent = `⏱️ ${lesson.duration} • 🧩 ${lesson.level}`;

  // Reset audio progress
  audioProgress = {
    currentTime: 0,
    duration: 1,
    hasPlayed: false
  };

  // Determine the correct audio type based on file extension
  function getAudioType(audioUrl) {
    if (!audioUrl) return '';

    const extension = audioUrl.split('.').pop().toLowerCase();
    switch(extension) {
      case 'm4a':
      case 'mp4':
        return 'audio/mp4';
      case 'mp3':
        return 'audio/mpeg';
      case 'ogg':
      case 'opus':
        return 'audio/ogg; codecs=opus';
      case 'wav':
        return 'audio/wav';
      case 'webm':
        return 'audio/webm';
      default:
        return 'audio/*';
    }
  }

  const audioType = getAudioType(lesson.audio);

  // Create audio HTML
  const audioHTML = lesson.audio ? `
    <div class="audio-player-container" style="
      margin: 15px 0;
      background: #2a2a2d;
      border-radius: 10px;
      padding: 10px;
      border: 1px solid #3a3a3d;
    ">
      <audio controls class="lesson-audio" id="lesson-audio" style="width:100%">
        <source src="${lesson.audio}" type="audio/ogg; codecs=opus">
      </audio>
      <div class="audio-progress" style="
        margin-top: 8px;
        font-size: 0.8rem;
        display: flex;
        justify-content: space-between;
      ">
        <span style="color: #aaa;">Listened:</span>
        <span id="audio-progress-text" style="color: #b4ff39; font-weight: bold;">0%</span>
      </div>
    </div>
  ` : '<p class="no-audio">Audio not available for this lesson</p>';

  // Create video HTML if video exists
  const videoHTML = lesson.video ? `
    <div class="video-container">
      <iframe src="${lesson.video}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
    </div>
  ` : '';

  // Create the complete lesson content HTML
  document.getElementById('lesson-content').innerHTML = `
    ${audioHTML}
    ${videoHTML}
    <div class="lesson-description">
      <p>${lesson.description}</p>
      ${lesson.text || ''}
    </div>
  `;

  // Add DOCX file section for lesson 26
  if (dayNumber === 26) {
    document.getElementById('lesson-content').innerHTML += `
      <div class="docx-lesson">
        <h3>Asilimia Za Mkonga Wako Kusimama</h3>
        <p>Download the DOCX file for additional information:</p>
        <a href="wazimu/Lesson 6.5---Asilimia Za Mkonga Kusimama.docx" download>Download DOCX</a>
      </div>
    `;
  }

  // Set up audio event listeners if audio exists
  if (lesson.audio) {
    const audioElement = document.getElementById('lesson-audio');
    if (audioElement) {
      // Reset played ranges when loading new lesson
      audioProgress.playedRanges = [];
      audioProgress.lastUpdateTime = 0;

      audioElement.addEventListener('timeupdate', function() {
        const now = this.currentTime;
        const duration = this.duration || 1;

        // Detect if user seeked backward (ignore forward seeks)
        if (now < audioProgress.lastUpdateTime) {
          // Reset played ranges if user seeks backward
          audioProgress.playedRanges = [];
        }
        audioProgress.lastUpdateTime = now;

        // Track played ranges (only if actually playing, not seeking)
        if (!this.paused) {
          const currentRange = {
            start: Math.max(0, now - 0.5), // 0.5 sec buffer
            end: now
          };

          // Merge with existing ranges if overlapping
          let merged = false;
          for (let i = 0; i < audioProgress.playedRanges.length; i++) {
            const range = audioProgress.playedRanges[i];
            if (currentRange.start <= range.end && currentRange.end >= range.start) {
              range.start = Math.min(range.start, currentRange.start);
              range.end = Math.max(range.end, currentRange.end);
              merged = true;
              break;
            }
          }

          if (!merged) {
            audioProgress.playedRanges.push(currentRange);
          }
        }

        // Calculate actual played percentage
        const playedPercentage = calculatePlayedPercentage(audioProgress.playedRanges, duration);
        document.getElementById('audio-progress-text').textContent = `${playedPercentage}%`;

        if (!userProgress.lessonProgress[dayNumber]) {
          userProgress.lessonProgress[dayNumber] = 0;
        }
        userProgress.lessonProgress[dayNumber] = Math.max(
          userProgress.lessonProgress[dayNumber],
          playedPercentage
        );
        saveUserProgress();
      });
      audioElement.addEventListener('ended', function() {
        markLessonCompleted(dayNumber);
      });

      // Try to play automatically (muted to avoid autoplay restrictions)
      audioElement.muted = true;
      const playPromise = audioElement.play();

      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log('Autoplay prevented, showing controls instead');
          audioElement.muted = false;
          audioElement.controls = true;
        }).then(() => {
          audioElement.muted = false;
        });
      }
    }
  }

  // Add this new helper function to calculate actual played percentage
  function calculatePlayedPercentage(ranges, duration) {
    if (!duration || duration <= 0) return 0;

    // Merge all overlapping ranges
    const mergedRanges = [];
    ranges.sort((a, b) => a.start - b.start);

    for (const range of ranges) {
      if (!mergedRanges.length) {
        mergedRanges.push({...range});
        continue;
      }

      const lastRange = mergedRanges[mergedRanges.length - 1];
      if (range.start <= lastRange.end) {
        lastRange.end = Math.max(lastRange.end, range.end);
      } else {
        mergedRanges.push({...range});
      }
    }

    // Calculate total played seconds
    const playedSeconds = mergedRanges.reduce((total, range) => {
      return total + (range.end - range.start);
    }, 0);

    // Return percentage (capped at 100)
    return Math.min(Math.round((playedSeconds / duration) * 100), 100);
  }

  // Update the canProceedToNextLesson function
  function canProceedToNextLesson(dayNumber) {
    // If no audio, consider it completed when opened
    const lesson = lessonsData.find(l => l.day === dayNumber);
    if (!lesson?.audio) return true;

    // Check if user has genuinely listened to at least 70% of audio
    const progress = userProgress.lessonProgress[dayNumber] || 0;
    return progress >= 70 || userProgress.completedLessons.includes(dayNumber);
  }

  // In loadLesson(), after setting the content:
  const audioElements = document.querySelectorAll('.sub-lesson audio');
  audioElements.forEach((audio, index) => {
    audio.addEventListener('timeupdate', function() {
      // Track progress for each audio
      const progressPercent = Math.round((this.currentTime / this.duration) * 100);
      console.log(`Sub-lesson audio ${index + 1} progress: ${progressPercent}%`);

      // You can store this progress in userProgress if needed
      if (!userProgress.lessonProgress[`sub-${dayNumber}-${index}`]) {
        userProgress.lessonProgress[`sub-${dayNumber}-${index}`] = 0;
      }
      userProgress.lessonProgress[`sub-${dayNumber}-${index}`] = Math.max(
        userProgress.lessonProgress[`sub-${dayNumber}-${index}`],
        progressPercent
      );
      saveUserProgress();
    });

    audio.addEventListener('ended', function() {
      // Mark as completed
      console.log(`Sub-lesson audio ${index + 1} completed`);
      // You can add additional logic here to mark the sub-lesson as completed
    });
  });

  // Update user progress
  userProgress.lastAccessed = lesson.day;
  saveUserProgress();
  updateProgressDisplay();

  setTimeout(() => {
    const audioEl = document.getElementById('lesson-audio');
    if (audioEl) {
      audioEl.style.cssText = 'width:100% !important; height:50px !important; background:red !important;';
      console.log('Audio element dimensions:', audioEl.offsetWidth, audioEl.offsetHeight);
    }
  }, 500);

  document.addEventListener('click', (e) => {
    const audioEl = document.getElementById('lesson-audio');
    if (audioEl && audioEl.contains(e.target)) {
      console.log('Clicked directly on audio element');
    }
  });

  // Add event listener for assignment box
  const assignmentBox = document.querySelector('.assignment-box');
  if (assignmentBox) {
    const assignmentHeader = assignmentBox.querySelector('.assignment-header');
    assignmentHeader.addEventListener('click', function() {
      const progress = userProgress.lessonProgress[dayNumber] || 0;
      if (progress >= 70 || userProgress.completedLessons.includes(dayNumber)) {
        assignmentBox.classList.toggle('expanded');
      } else {
        alert("Please listen to at least 70% of the audio before unfolding this section.");
      }
    });
  }
}

// Mark lesson as completed
async function markLessonCompleted(dayNumber) {
  if (!userProgress.completedLessons.includes(dayNumber)) {
    userProgress.completedLessons.push(dayNumber);
    await saveUserProgress();
    updateProgressDisplay();
  }
}

// Check if user can proceed to next lesson
function canProceedToNextLesson(dayNumber) {
  // If no audio, consider it completed when opened
  if (!lessonsData.find(l => l.day === dayNumber)?.audio) {
    return true;
  }

  // Check if user has listened to at least 70% of audio
  const progress = userProgress.lessonProgress[dayNumber] || 0;
  return progress >= 70 || userProgress.completedLessons.includes(dayNumber);
}

// Handle continue button
document.querySelector('.continue').addEventListener('click', async function() {
  const currentActive = document.querySelector('.day.active');
  if (!currentActive) return;

  const currentDay = parseInt(currentActive.dataset.day);

  if (!canProceedToNextLesson(currentDay)) {
    document.querySelector('.progress-warning').style.display = 'block';
    setTimeout(() => {
      document.querySelector('.progress-warning').style.display = 'none';
    }, 3000);
    return;
  }

  document.querySelector('.progress-warning').style.display = 'none';
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
    alert("You've completed all available lessons!");
  }
});

// Handle bottom navigation
document.querySelectorAll('.nav-btn').forEach(button => {
  button.addEventListener('click', function() {
    const target = this.dataset.target;

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    this.classList.add('active');

    // Show/hide sections based on navigation
    if (target === 'account') {
      document.querySelector('.account-section').style.opacity = '1';
      document.querySelector('.account-section').style.visibility = 'visible';
      document.querySelector('.my-activity').style.opacity = '0';
      document.querySelector('.my-activity').style.visibility = 'hidden';
      document.querySelector('.training-plan').style.opacity = '0';
      document.querySelector('.training-plan').style.visibility = 'hidden';
    } else {
      document.querySelector('.account-section').style.opacity = '0';
      document.querySelector('.account-section').style.visibility = 'hidden';
      document.querySelector('.my-activity').style.opacity = '1';
      document.querySelector('.my-activity').style.visibility = 'visible';
      document.querySelector('.training-plan').style.opacity = '1';
      document.querySelector('.training-plan').style.visibility = 'visible';
    }
  });
});

// Load saved font on page load
window.addEventListener('DOMContentLoaded', function() {
  const savedFont = localStorage.getItem('kayaLearningFont');
  if (savedFont) {
    document.body.style.fontFamily = savedFont;
    document.getElementById('fontSelect').value = savedFont;
  }

  // Load saved font size
  const savedFontSize = localStorage.getItem('kayaLearningFontSize');
  if (savedFontSize) {
    document.body.style.fontSize = savedFontSize;
    document.getElementById('fontSizeSelect').value = savedFontSize;
  }

  // Load saved font weight
  const savedFontWeight = localStorage.getItem('kayaLearningFontWeight');
  if (savedFontWeight) {
    document.body.style.fontWeight = savedFontWeight;
    document.getElementById('fontWeightSelect').value = savedFontWeight;
  }

  // Load saved font color
  const savedFontColor = localStorage.getItem('kayaLearningFontColor');
  if (savedFontColor) {
    document.body.style.color = savedFontColor;
    document.getElementById('fontColorSelect').value = savedFontColor;
  }
});

// Add event listeners for font settings
document.getElementById('fontSelect').addEventListener('change', function() {
  const font = this.value;
  document.body.style.fontFamily = font;
  localStorage.setItem('kayaLearningFont', font);
});

document.getElementById('fontSizeSelect').addEventListener('change', function() {
  const fontSize = this.value;
  document.body.style.fontSize = fontSize;
  localStorage.setItem('kayaLearningFontSize', fontSize);
});

document.getElementById('fontWeightSelect').addEventListener('change', function() {
  const fontWeight = this.value;
  document.body.style.fontWeight = fontWeight;
  localStorage.setItem('kayaLearningFontWeight', fontWeight);
});

document.getElementById('fontColorSelect').addEventListener('change', function() {
  const fontColor = this.value;
  document.body.style.color = fontColor;
  localStorage.setItem('kayaLearningFontColor', fontColor);
});

// Initialize progress display if logged in
if (document.getElementById('mainApp').style.display !== 'none') {
  initUserProgress();
  updateProgressDisplay();
}

// Handle registration link click
document.getElementById('registerLink').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
});

// Handle login link click
document.getElementById('loginLink').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
});

// When showing forms, add class to body
function showForm(formId) {
  document.body.classList.add('form-open');
  document.getElementById(formId).style.display = 'flex'; // Changed to flex
}

// When hiding forms, remove class
function hideForm(formId) {
  document.body.classList.remove('form-open');
  document.getElementById(formId).style.display = 'none';
}

// Update your form toggle events to use these functions
document.getElementById('registerLink').addEventListener('click', function(e) {
  e.preventDefault();
  hideForm('loginForm');
  showForm('registerForm');
});

document.getElementById('loginLink').addEventListener('click', function(e) {
  e.preventDefault();
  hideForm('registerForm');
  showForm('loginForm');
});
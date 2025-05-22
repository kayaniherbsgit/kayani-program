document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
    return;
  }

  try {
    const res = await fetch("/api/user/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const text = await res.text();
    console.log("🧪 Raw Response:", text);

    if (!res.ok) throw new Error(`Access denied: ${res.status}`);

    const users = JSON.parse(text);
    window.allUsers = users;
    renderUsers(users);

    // Search functionality
    document.getElementById("searchInput").addEventListener("input", function () {
      const term = this.value.toLowerCase();
      const filtered = window.allUsers.filter(user =>
        user.username.toLowerCase().includes(term)
      );
      renderUsers(filtered);
    });

    // Logout button
    document.getElementById("adminLogoutBtn").addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "/";
    });

    // ESC key to exit multi-select mode
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") exitMultiSelectMode();
    });

  } catch (err) {
    console.error("❌ ADMIN FETCH ERROR:", err);
    showToast("Failed to load users.");
  }
});

let multiSelectMode = false;
let selectedUsers = new Set();

function renderUsers(userList) {
  const container = document.getElementById("usersList");
  container.innerHTML = "";

  userList.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <div class="user-header" ondblclick="enableMultiSelect('${user._id}')">
        <input type="checkbox" class="select-user" data-id="${user._id}" style="display:none;" />
        <img src="${user.avatarUrl}" alt="Avatar">
        <div class="user-info">
          <div class="username">${user.username}</div>
          <div class="details">Lessons: ${user.completedLessons?.length || 0} | Progress: ${Object.keys(user.lessonProgress || {}).length}</div>
        </div>
      </div>
      <div class="user-actions">
        <button onclick="viewProgress('${user._id}')">View</button>
        <button onclick="deleteUser('${user._id}')">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Enable multi-select mode on double-click
function enableMultiSelect(userId) {
  if (!multiSelectMode) {
    multiSelectMode = true;
    showToast("Multi-select mode enabled. Tap checkboxes to select users.");

    // Show checkboxes
    document.querySelectorAll(".select-user").forEach(cb => {
      cb.style.display = "inline-block";
      cb.addEventListener("change", handleCheckboxChange);
    });

    // Add Delete Selected button
    const deleteBtn = document.createElement("button");
    deleteBtn.id = "deleteSelectedBtn";
    deleteBtn.textContent = "Delete Selected";
    deleteBtn.style.margin = "15px auto";
    deleteBtn.style.display = "block";
    deleteBtn.style.backgroundColor = "#ff4d4d";
    deleteBtn.style.color = "white";
    deleteBtn.style.padding = "10px 20px";
    deleteBtn.style.borderRadius = "10px";
    deleteBtn.style.border = "none";
    deleteBtn.style.cursor = "pointer";

    deleteBtn.onclick = deleteSelectedUsers;
    document.querySelector(".admin-dashboard").appendChild(deleteBtn);
  }

  // Automatically check the clicked one
  document.querySelector(`.select-user[data-id="${userId}"]`).checked = true;
  selectedUsers.add(userId);
}

function handleCheckboxChange(e) {
  const id = e.target.dataset.id;
  if (e.target.checked) {
    selectedUsers.add(id);
  } else {
    selectedUsers.delete(id);
  }
}

async function deleteSelectedUsers() {
  const token = localStorage.getItem("token");
  if (selectedUsers.size === 0) return showToast("No users selected.");

  if (!confirm(`Delete ${selectedUsers.size} selected users?`)) return;

  try {
    for (const id of selectedUsers) {
      await fetch(`/api/user/admin/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    showToast(`${selectedUsers.size} user(s) deleted.`);
    location.reload();
  } catch (err) {
    console.error("❌ BULK DELETE ERROR:", err);
    showToast("Failed to delete selected users.");
  }
}

// Exit multi-select mode
function exitMultiSelectMode() {
  multiSelectMode = false;
  selectedUsers.clear();
  document.querySelectorAll(".select-user").forEach(cb => {
    cb.style.display = "none";
    cb.checked = false;
    cb.removeEventListener("change", handleCheckboxChange);
  });

  const deleteBtn = document.getElementById("deleteSelectedBtn");
  if (deleteBtn) deleteBtn.remove();
  showToast("Exited multi-select mode.");
}

async function deleteUser(userId) {
  const token = localStorage.getItem("token");
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    const res = await fetch(`/api/user/admin/user/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Delete failed");

    showToast("User deleted.");
    location.reload();
  } catch (err) {
    console.error(err);
    showToast("Error deleting user.");
  }
}

async function viewProgress(userId) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`/api/user/admin/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to fetch user");

    const user = await res.json();
    const modal = document.getElementById("progressModal");
    const modalBody = document.getElementById("modalBody");

    modalBody.innerHTML = `
      <div style="text-align:center">
        <img src="${user.avatarUrl}" alt="Avatar" style="width:60px; height:60px; border-radius:50%; margin-bottom:10px" />
        <h3 style="margin-bottom:5px; color:#b4ff39">${user.username}</h3>
      </div>
      <p><strong>Completed Lessons:</strong> ${user.completedLessons?.length || 0}</p>
      <p><strong>Last Accessed:</strong> Day ${user.lastAccessed || 'N/A'}</p>
      <p><strong>Total Lessons Tracked:</strong> ${Object.keys(user.lessonProgress || {}).length}</p>
    `;

    modal.style.display = "flex";
  } catch (err) {
    console.error(err);
    showToast("Failed to load progress");
  }
}

function closeModal() {
  document.getElementById("progressModal").style.display = "none";
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

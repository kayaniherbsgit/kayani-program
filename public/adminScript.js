const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user || !user.isAdmin) {
  alert("Access denied. You're not an admin.");
  window.location.href = "/";
}

async function loadAdminUsers() {
  try {
    const res = await fetch("/api/user/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const users = await res.json();
    const container = document.getElementById("adminUsers");

    if (!Array.isArray(users)) {
      container.innerHTML = `<p class="error">Error: ${users.message || "Unknown error"}</p>`;
      return;
    }

    container.innerHTML = users
      .map(
        (u) => `
        <div class="admin-user">
          <div class="admin-user-info">
            <img src="${u.avatarUrl || "https://i.pravatar.cc/50"}" alt="avatar"/>
            <div>
              <strong>${u.username}</strong>
              <p>Lessons Completed: ${u.completedLessons?.length || 0}</p>
              <p>Lessons Interacted: ${Object.keys(u.lessonProgress || {}).length}</p>
              <p>Last Accessed: ${u.lastAccessed ?? "N/A"}</p>
            </div>
          </div>
          <button onclick="deleteUser('${u._id}')">Delete</button>
        </div>`
      )
      .join("");
  } catch (err) {
    console.error("Error loading users:", err);
    document.getElementById("adminUsers").innerHTML = `<p class="error">Failed to load users.</p>`;
  }
}

async function deleteUser(userId) {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    const res = await fetch(`/api/user/admin/user/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    alert(data.message || "User deleted");
    loadAdminUsers();
  } catch (err) {
    console.error("Error deleting user:", err);
    alert("Failed to delete user.");
  }
}

document.getElementById("adminLogoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
});

window.addEventListener("DOMContentLoaded", loadAdminUsers);

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Not authorized");
    window.location.href = "/";
    return;
  }

  try {
    const res = await fetch("/api/user/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Access denied");

    const users = await res.json();
    const container = document.getElementById("usersList");
    container.innerHTML = "";

    users.forEach(user => {
      const card = document.createElement("div");
      card.className = "user-card";
      card.innerHTML = `
        <div class="user-header">
          <img src="${user.avatarUrl}" alt="Avatar">
          <div class="user-info">
            <div class="username">${user.username}</div>
            <div class="details">Lessons: ${user.completedLessons?.length || 0} | Progress: ${Object.keys(user.lessonProgress || {}).length}</div>
          </div>
        </div>
        <div class="user-actions">
          <button onclick="deleteUser('${user._id}')">Delete</button>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    alert("Failed to load users.");
  }
});

async function deleteUser(userId) {
  const token = localStorage.getItem("token");
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    const res = await fetch(`/api/user/admin/user/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Delete failed");

    alert("User deleted successfully.");
    location.reload();
  } catch (err) {
    console.error(err);
    alert("Error deleting user.");
  }
}

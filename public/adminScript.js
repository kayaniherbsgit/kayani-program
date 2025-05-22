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
    const tbody = document.querySelector("#usersTable tbody");
    tbody.innerHTML = "";

    users.forEach(user => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${user.username}</td>
        <td><img src="${user.avatarUrl}" alt="Avatar" style="width:40px; height:40px; border-radius:50%"/></td>
        <td>${user.completedLessons?.length || 0}</td>
        <td>${Object.keys(user.lessonProgress || {}).length}</td>
        <td><button onclick="deleteUser('${user._id}')">Delete</button></td>
      `;

      tbody.appendChild(tr);
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
// Fake user data (có thể đổi role thành 'admin' để test)
const user = {
  full_name: "Nguyen Van A",
  role: "student",
};

let currentView = "student-dashboard";

// Hàm render Header
function renderHeader() {
  const header = document.getElementById("app-header");
  header.innerHTML = `
    <div class="header-container">
      <!-- Logo -->
      <div class="logo">
        <div class="logo-icon"><i class="fa fa-book-open"></i></div>
        <h1>Book4U</h1>
      </div>

      <!-- Navigation -->
      <nav>
        <button id="nav-dashboard" class="${
          currentView.includes("dashboard") ? "active" : ""
        }">
          <i class="fa fa-home"></i><span>Dashboard</span>
        </button>
        <button id="nav-books" class="${
          currentView === "books" || currentView === "book-detail"
            ? "active"
            : ""
        }">
          <i class="fa fa-book"></i><span>Books</span>
        </button>
        ${
          user.role === "student"
            ? `
          <button id="nav-borrowing" class="${
            currentView === "borrowing" ? "active" : ""
          }">
            <i class="fa fa-clock-rotate-left"></i><span>My Books</span>
          </button>`
            : ""
        }
        ${
          user.role === "admin"
            ? `
          <button id="nav-users">
            <i class="fa fa-users"></i><span>Users</span>
          </button>`
            : ""
        }
      </nav>

      <!-- User menu -->
      <div class="user-menu">
        <div class="user-info">
          <div class="user-icon"><i class="fa fa-user"></i></div>
          <div class="user-details">
            <div class="name">${user.full_name}</div>
            <div class="role">${user.role}</div>
          </div>
        </div>
        <button id="logout-btn" class="logout-btn">
          <i class="fa fa-right-from-bracket"></i><span>Logout</span>
        </button>
      </div>
    </div>
  `;

  attachEvents();
}

// Gán sự kiện click
function attachEvents() {
  document
    .getElementById("nav-dashboard")
    ?.addEventListener("click", () =>
      navigate(user.role === "admin" ? "admin-dashboard" : "student-dashboard")
    );
  document
    .getElementById("nav-books")
    ?.addEventListener("click", () => navigate("books"));
  document
    .getElementById("nav-borrowing")
    ?.addEventListener("click", () => navigate("borrowing"));
  document
    .getElementById("nav-users")
    ?.addEventListener("click", () => navigate("users"));
  document.getElementById("logout-btn")?.addEventListener("click", logout);
}

// Hàm điều hướng view
function navigate(view) {
  currentView = view;
  renderHeader();
  document.getElementById("view-title").textContent = "Current view: " + view;
}

function logout() {
  alert("You have been logged out!");
  window.location.href = "Login.html";
}

// Render lần đầu
renderHeader();

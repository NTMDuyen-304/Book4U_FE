const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorBox = document.getElementById("error");
const togglePasswordBtn = document.getElementById("togglePassword");
const loginBtn = document.getElementById("loginBtn");

let showPassword = false;

// Toggle hiển thị mật khẩu
togglePasswordBtn.addEventListener("click", () => {
  showPassword = !showPassword;
  passwordInput.type = showPassword ? "text" : "password";
  togglePasswordBtn.textContent = showPassword ? "🙈" : "👁️";
});

// Xử lý submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorBox.style.display = "none";

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showError("Please fill in all fields");
    return;
  }

  if (!validateEmail(email)) {
    showError("Invalid email format");
    return;
  }

  loginBtn.disabled = true;
  loginBtn.innerHTML = `<div class="spinner"></div>`;

  setTimeout(() => {
    if (email === "student@book4u.edu" && password === "student123") {
      // Login success as student
      window.location.href = "fragments/Header.html";
    } else if (email === "admin@book4u.edu" && password === "admin123") {
      // Login success as admin
      window.location.href = "AdminDashboard.html";
      showError("Invalid email or password");
      loginBtn.disabled = false;
      loginBtn.textContent = "Sign In";
      return;
    }

    loginBtn.disabled = false;
    loginBtn.textContent = "Sign In";
    form.reset();
  }, 1000);
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.style.display = "block";
}

function fillDemo(role) {
  if (role === "student") {
    emailInput.value = "student@book4u.edu";
    passwordInput.value = "student123";
  } else {
    emailInput.value = "admin@book4u.edu";
    passwordInput.value = "admin123";
  }
}

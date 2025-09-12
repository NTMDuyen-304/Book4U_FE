const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorBox = document.getElementById("error");
const togglePasswordBtn = document.getElementById("togglePassword");
const loginBtn = document.getElementById("loginBtn");

let showPassword = false;

togglePasswordBtn.addEventListener("click", () => {
  showPassword = !showPassword;
  passwordInput.type = showPassword ? "text" : "password";
  togglePasswordBtn.textContent = showPassword ? "🙈" : "👁️";
});

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
    if (
      (email === "student@book4u.edu" && password === "student123") ||
      (email === "admin@book4u.edu" && password === "admin123")
    ) {
      alert("✅ Login successful!");
      form.reset();
    } else {
      showError("Invalid email or password");
    }
    loginBtn.disabled = false;
    loginBtn.textContent = "Sign In";
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

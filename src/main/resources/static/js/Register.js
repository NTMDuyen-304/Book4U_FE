const form = document.getElementById("registerForm");
const submitBtn = document.getElementById("submitBtn");

function showError(id, message) {
  document.getElementById("error-" + id).textContent = message;
}

function clearError(id) {
  document.getElementById("error-" + id).textContent = "";
}

// Toggle password visibility
document.querySelectorAll(".toggle-password").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const input = document.getElementById(targetId);
    if (input.type === "password") {
      input.type = "text";
      btn.textContent = "🙈";
    } else {
      input.type = "password";
      btn.textContent = "👁️";
    }
  });
});

// Form validation
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let isValid = true;
  const fullName = form.full_name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  if (!fullName) {
    showError("full_name", "Full name is required");
    isValid = false;
  } else clearError("full_name");

  if (!email) {
    showError("email", "Email is required");
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    showError("email", "Please enter a valid email");
    isValid = false;
  } else clearError("email");

  if (!password) {
    showError("password", "Password is required");
    isValid = false;
  } else if (password.length < 6) {
    showError("password", "Password must be at least 6 characters");
    isValid = false;
  } else clearError("password");

  if (password !== confirmPassword) {
    showError("confirmPassword", "Passwords do not match");
    isValid = false;
  } else clearError("confirmPassword");

  if (!isValid) return;

  // Simulate loading
  submitBtn.disabled = true;
  submitBtn.textContent = "Loading...";

  await new Promise((resolve) => setTimeout(resolve, 1000));

  alert(
    "Account created successfully!\n\n" +
      "Full Name: " +
      fullName +
      "\n" +
      "Email: " +
      email
  );

  submitBtn.disabled = false;
  submitBtn.textContent = "Create Account";
  form.reset();
});

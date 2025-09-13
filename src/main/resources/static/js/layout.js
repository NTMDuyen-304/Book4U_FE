// layout.js - Load common header & footer fragments

document.addEventListener("DOMContentLoaded", () => {
  const headerEl = document.getElementById("header");
  const footerEl = document.getElementById("footer");

  if (headerEl) {
    fetch("fragments/header.html")
      .then((res) => res.text())
      .then((data) => {
        headerEl.innerHTML = data;
      })
      .catch((err) => console.error("Error loading header:", err));
  }

  if (footerEl) {
    fetch("fragments/footer.html")
      .then((res) => res.text())
      .then((data) => {
        footerEl.innerHTML = data;
      })
      .catch((err) => console.error("Error loading footer:", err));
  }
});

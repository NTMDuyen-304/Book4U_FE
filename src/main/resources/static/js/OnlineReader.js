// Sample book data
const sampleBook = {
  title: "Modern Web Development",
  author: "Jane Doe",
  category: "Technology",
  published_year: 2023,
  description: "An in-depth guide to mastering modern web technologies.",
  url: "https://book4u.edu/sample-book",
};

let readingTime = 0;
let timer;

// DOM elements
const reader = document.getElementById("online-reader");
const openBtn = document.getElementById("open-reader");
const closeBtn = document.getElementById("close-reader");
const readingTimeEl = document.getElementById("reading-time");

// Fill book data
function loadBook(book) {
  document.getElementById("book-title").textContent = book.title;
  document.getElementById("book-author").textContent = "by " + book.author;
  document.getElementById("reader-title").textContent = book.title;
  document.getElementById("book-description").textContent = book.description;
  document.getElementById("meta-author").textContent = book.author;
  document.getElementById("meta-category").textContent = book.category;
  document.getElementById("meta-year").textContent = book.published_year;
}

// Format time
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = String(seconds % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

// Open reader
openBtn.addEventListener("click", () => {
  loadBook(sampleBook);
  reader.classList.remove("hidden");
  readingTime = 0;
  readingTimeEl.textContent = "0:00";
  timer = setInterval(() => {
    readingTime++;
    readingTimeEl.textContent = formatTime(readingTime);
  }, 1000);
});

// Close reader
closeBtn.addEventListener("click", () => {
  reader.classList.add("hidden");
  clearInterval(timer);
});

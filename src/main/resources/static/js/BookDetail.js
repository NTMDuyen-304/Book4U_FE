// Mock data
const book = {
  id: 1,
  title: "Clean Code",
  author: "Robert C. Martin",
  category: "Programming",
  published_year: 2008,
  stock: 3,
  description: "A Handbook of Agile Software Craftsmanship",
  cover_image: "https://m.media-amazon.com/images/I/41xShlnTZTL.jpg",
};

const currentUser = { id: 101, role: "student" };
const borrowRecords = [{ student_id: 101, book_id: 2, status: "borrowed" }];

// Check if user has already borrowed
const userHasBorrowed = borrowRecords.some(
  (r) =>
    r.student_id === currentUser.id &&
    r.book_id === book.id &&
    r.status === "borrowed"
);

// DOM elements
document.getElementById("bookCover").src = book.cover_image;
document.getElementById("bookTitle").textContent = book.title;
document.getElementById("bookAuthor").textContent = "by " + book.author;
document.getElementById("bookCategory").textContent = book.category;
document.getElementById("bookYear").textContent = book.published_year;
document.getElementById("bookStock").textContent = `${book.stock} copies`;
document.getElementById("bookDescription").textContent = book.description;
document.getElementById("bookStatus").textContent = userHasBorrowed
  ? "Borrowed"
  : "Available";

const borrowBtn = document.getElementById("borrowBtn");
const message = document.getElementById("message");

if (userHasBorrowed) {
  borrowBtn.style.display = "none";
}

borrowBtn.addEventListener("click", () => {
  message.textContent = "";
  if (book.stock > 0) {
    book.stock--;
    document.getElementById("bookStock").textContent = `${book.stock} copies`;
    message.textContent = `Successfully borrowed "${book.title}"!`;
    message.className = "success";
    borrowBtn.disabled = true;
  } else {
    message.textContent = "Unable to borrow this book. It may be out of stock.";
    message.className = "error";
  }
});

// Read button
document.getElementById("readBtn").addEventListener("click", () => {
  alert(`Opening "${book.title}" for online reading...`);
});

// Back button
document.getElementById("backBtn").addEventListener("click", () => {
  alert("Going back to book list...");
});

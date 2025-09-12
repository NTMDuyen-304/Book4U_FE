// Sample data (bạn có thể thay bằng dữ liệu thực từ backend)
const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    published_year: 2008,
    stock: 3,
    cover_image: "https://picsum.photos/200/300?random=1",
    description: "A Handbook of Agile Software Craftsmanship.",
  },
  {
    id: 2,
    title: "Design Patterns",
    author: "Erich Gamma",
    category: "Programming",
    published_year: 1994,
    stock: 0,
    cover_image: "https://picsum.photos/200/300?random=2",
    description: "Elements of Reusable Object-Oriented Software.",
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-help",
    published_year: 2018,
    stock: 5,
    cover_image: "https://picsum.photos/200/300?random=3",
    description: "Tiny Changes, Remarkable Results.",
  },
];

const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const booksGrid = document.getElementById("booksGrid");
const resultCount = document.getElementById("resultCount");
const noBooks = document.getElementById("noBooks");

// Render category options
function loadCategories() {
  const categories = [...new Set(books.map((book) => book.category))];
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

// Render books
function renderBooks() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm);
    const matchesCategory =
      selectedCategory === "" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  booksGrid.innerHTML = "";

  filteredBooks.forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${book.cover_image}" alt="${book.title}" class="book-cover">
      <div class="book-info">
        <h3>${book.title}</h3>
        <p>by ${book.author}</p>
        <p><span class="badge badge-category">${book.category}</span> | ${
      book.published_year
    }</p>
        <p>
          <span class="badge ${book.stock > 0 ? "badge-stock" : "badge-out"}">
            ${book.stock > 0 ? book.stock + " available" : "Out of stock"}
          </span>
        </p>
        <p class="desc">${book.description ?? ""}</p>
      </div>
    `;
    booksGrid.appendChild(card);
  });

  resultCount.textContent = `Showing ${filteredBooks.length} of ${books.length} books`;
  noBooks.classList.toggle("hidden", filteredBooks.length > 0);
}

// Event listeners
searchInput.addEventListener("input", renderBooks);
categorySelect.addEventListener("change", renderBooks);

// Init
loadCategories();
renderBooks();

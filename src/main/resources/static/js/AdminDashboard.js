let books = [];
let editingIndex = null;

function updateStats() {
  document.getElementById("totalUsers").innerText = 10; // giả định
  document.getElementById("totalBooks").innerText = books.length;
  document.getElementById("totalBorrowed").innerText = 3; // giả định
  document.getElementById("overdueBooks").innerText = 1; // giả định
}

function renderBooks() {
  const tbody = document.getElementById("booksTable");
  tbody.innerHTML = "";

  books.forEach((book, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><b>${book.title}</b><br><small>by ${book.author}</small></td>
      <td>${book.category}</td>
      <td>${book.stock}</td>
      <td>
        <button class="edit" onclick="editBook(${index})">✏️</button>
        <button class="delete" onclick="deleteBook(${index})">🗑️</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  updateStats();
}

function openModal() {
  document.getElementById("bookModal").style.display = "flex";
  document.getElementById("modalTitle").innerText =
    editingIndex !== null ? "Edit Book" : "Add New Book";
}

function closeModal() {
  document.getElementById("bookModal").style.display = "none";
  clearForm();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("category").value = "";
  document.getElementById("year").value = new Date().getFullYear();
  document.getElementById("stock").value = 1;
  document.getElementById("url").value = "";
  document.getElementById("description").value = "";
  editingIndex = null;
}

document.getElementById("saveBtn").onclick = () => {
  const book = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    category: document.getElementById("category").value,
    published_year: parseInt(document.getElementById("year").value),
    stock: parseInt(document.getElementById("stock").value),
    url: document.getElementById("url").value,
    description: document.getElementById("description").value,
  };

  if (editingIndex !== null) {
    books[editingIndex] = book;
  } else {
    books.push(book);
  }

  renderBooks();
  closeModal();
};

function editBook(index) {
  const book = books[index];
  editingIndex = index;

  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("category").value = book.category;
  document.getElementById("year").value = book.published_year;
  document.getElementById("stock").value = book.stock;
  document.getElementById("url").value = book.url;
  document.getElementById("description").value = book.description;

  openModal();
}

function deleteBook(index) {
  if (confirm("Are you sure you want to delete this book?")) {
    books.splice(index, 1);
    renderBooks();
  }
}

renderBooks();

// Sample data
const books = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: "2", title: "1984", author: "George Orwell" },
  { id: "3", title: "To Kill a Mockingbird", author: "Harper Lee" },
];

let borrowRecords = [
  {
    id: "r1",
    book_id: "1",
    borrow_date: "2025-08-20",
    due_date: "2025-09-15",
    status: "borrowed",
    renewed: false,
  },
  {
    id: "r2",
    book_id: "2",
    borrow_date: "2025-07-01",
    due_date: "2025-07-20",
    return_date: "2025-07-19",
    status: "returned",
    renewed: false,
  },
  {
    id: "r3",
    book_id: "3",
    borrow_date: "2025-08-10",
    due_date: "2025-08-25",
    status: "borrowed",
    renewed: true,
  },
];

// Utils
function getBookTitle(bookId) {
  return books.find((b) => b.id === bookId)?.title || "Unknown";
}
function getBookAuthor(bookId) {
  return books.find((b) => b.id === bookId)?.author || "Unknown";
}
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
function getDaysUntilDue(dueDateString) {
  const dueDate = new Date(dueDateString);
  const today = new Date();
  return Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
}
function getStatusColor(record) {
  if (record.status === "returned") return "bg-green";
  const days = getDaysUntilDue(record.due_date);
  if (days < 0) return "bg-red";
  if (days <= 3) return "bg-yellow";
  return "bg-blue";
}
function getStatusText(record) {
  if (record.status === "returned") return "Returned";
  const days = getDaysUntilDue(record.due_date);
  if (days < 0) return `Overdue by ${Math.abs(days)} days`;
  if (days === 0) return "Due today";
  return `${days} days left`;
}

// Actions
function onReturnBook(borrowId) {
  const record = borrowRecords.find((r) => r.id === borrowId);
  if (record) {
    record.status = "returned";
    record.return_date = new Date().toISOString();
  }
  render();
}
function onRenewBook(borrowId) {
  const record = borrowRecords.find((r) => r.id === borrowId);
  if (record && !record.renewed) {
    const newDueDate = new Date(record.due_date);
    newDueDate.setDate(newDueDate.getDate() + 7);
    record.due_date = newDueDate.toISOString();
    record.renewed = true;
  }
  render();
}

// Render
function render() {
  const app = document.getElementById("app");
  const activeRecords = borrowRecords.filter((r) => r.status === "borrowed");
  const completedRecords = borrowRecords.filter((r) => r.status === "returned");
  const overdueCount = activeRecords.filter(
    (r) => getDaysUntilDue(r.due_date) < 0
  ).length;

  app.innerHTML = `
    <div class="header">
      <h1>My Books</h1>
      <p>Manage your borrowed books and reading history</p>
    </div>

    <div class="stats">
      <div class="stat-card blue">
        <p>Currently Borrowed</p>
        <p><strong>${activeRecords.length}</strong></p>
      </div>
      <div class="stat-card green">
        <p>Books Returned</p>
        <p><strong>${completedRecords.length}</strong></p>
      </div>
      <div class="stat-card red">
        <p>Overdue Books</p>
        <p><strong>${overdueCount}</strong></p>
      </div>
    </div>

    ${
      activeRecords.length > 0
        ? `
      <div class="table-container">
        <div class="table-header">Currently Borrowed</div>
        <table>
          <thead>
            <tr>
              <th>Book</th><th>Borrowed Date</th><th>Due Date</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${activeRecords
              .map(
                (record) => `
              <tr>
                <td>
                  <div><strong>${getBookTitle(record.book_id)}</strong></div>
                  <div>by ${getBookAuthor(record.book_id)}</div>
                </td>
                <td>${formatDate(record.borrow_date)}</td>
                <td>
                  ${formatDate(record.due_date)}
                  ${
                    record.renewed
                      ? `<span class="badge bg-blue">Renewed</span>`
                      : ""
                  }
                </td>
                <td><span class="badge ${getStatusColor(
                  record
                )}">${getStatusText(record)}</span></td>
                <td>
                  <button class="return" onclick="onReturnBook('${
                    record.id
                  }')">Return</button>
                  ${
                    !record.renewed
                      ? `<button class="renew" onclick="onRenewBook('${record.id}')">Renew</button>`
                      : ""
                  }
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>`
        : ""
    }

    ${
      completedRecords.length > 0
        ? `
      <div class="table-container">
        <div class="table-header">Borrowing History</div>
        <table>
          <thead>
            <tr><th>Book</th><th>Borrowed Date</th><th>Returned Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${completedRecords
              .map(
                (record) => `
              <tr>
                <td>
                  <div><strong>${getBookTitle(record.book_id)}</strong></div>
                  <div>by ${getBookAuthor(record.book_id)}</div>
                </td>
                <td>${formatDate(record.borrow_date)}</td>
                <td>${
                  record.return_date ? formatDate(record.return_date) : "N/A"
                }</td>
                <td><span class="badge bg-green">Returned</span></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>`
        : ""
    }

    ${
      borrowRecords.length === 0
        ? `
      <div class="empty">
        <h3>No borrowing history</h3>
        <p>Start by browsing our book collection and borrowing your first book!</p>
      </div>`
        : ""
    }
  `;
}

render();

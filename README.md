# 📚 Book4U - Smart Library for Students (Frontend)

This repository contains the **Frontend (UI)** of the Book4U project – a web-based smart library system designed for students to **borrow, read, and manage books online**.
The website is built on the Client - Server model, connecting directly to the API from the Backend.

---

## 🚀 Features

- 📖 **Book Management (Admin)** – Add, edit, delete, and view books.
- 👨‍🎓 **Student Borrowing System** – Borrow up to 3 books at a time, with due dates and return tracking.
- 🌐 **Online Reading** – Students can read books online and save reading history.
- ⏳ **Borrow Renewal** – Request book renewals, track renewal history, and update due dates.
- 🔒 **Authentication & Authorization** – Login/registration with role-based access (Student/Admin).

---

## 🛠️ Tech Stack

- **Java 17+**
- **Spring Boot**
- **Thymeleaf** (HTML templates)
- **Vanilla JavaScript (ES6+)**
- **CSS3**
- **Maven**
- **SQL Database** (MySQL / PostgreSQL / H2 for testing)

---

## 📂 Project Structure

```
BOOK4U_FE/
│── .mvn/                  # Maven wrapper
│── src/
│   ├── main/
│   │   ├── java/com/example/Book4UFe/
│   │   │   └── Book4UFeApplication.java   # Main Spring Boot entry point
│   │   ├── resources/
│   │   │   ├── static/                   # Static assets (CSS, JS, images)
│   │   │   ├── templates/                # Thymeleaf HTML templates
│   │   │   ├── application.properties    # App configuration
│   │   │   ├── data.sql                  # Initial data
│   │   │   └── schema.sql                # Database schema
│   └── test/java/com/example/Book4UFe/
│       └── Book4UFeApplicationTests.java # Unit tests
│
│── target/                # Compiled files
│── pom.xml                # Maven dependencies
│── mvnw, mvnw.cmd         # Maven wrapper
│── README.md              # Project documentation
```

---

## ⚡ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/book4u-frontend.git
   cd book4u-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm start
   ```

4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## 🔗 API Connection

This frontend communicates with the **Book4U Backend API**.  
Make sure to set the **API base URL** in the environment file:

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🌍 Deployment

- **Frontend** can be deployed on [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com).
- **Backend** should be deployed separately (e.g., Render, Heroku).

---

## 👨‍💻 Authors

- **[Nguyen Thi My Duyen - 22520350]** – Project Developer
- Final Project – Software Engineering Course

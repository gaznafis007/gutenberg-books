# 📚 Gutenberg Books Explorer

A modern, responsive web application for exploring and discovering classic literature from the Project Gutenberg digital library.

[![Netlify Status](https://api.netlify.com/api/v1/badges/342a8a-vacherin-vocal/deploy-status)](https://vocal-vacherin-342a8a.netlify.app/)

---

## 🌐 Live Demo

Visit the live application: [Gutenberg Books Explorer](https://vocal-vacherin-342a8a.netlify.app/)

---

## ✨ Features

- **📚 Browse Books**: Explore thousands of classic books from Project Gutenberg.
- **🔍 Search Functionality**: Find books by title in real-time.
- **🏷️ Genre Filtering**: Filter books based on genre or topic.
- **📄 Pagination**: Navigate through large sets of book results efficiently.
- **❤️ Wishlist**: Add/remove books to/from your wishlist and save it in your browser.
- **📱 Responsive Design**: Fully responsive UI, mobile-friendly layout.
- **🌙 Book Details**: View detailed information of any book in a dedicated page.
- **⬇️ Download Options**: (Optional) Show available formats for download like EPUB/HTML.
- **🔄 No Page Refreshes**: Seamless UX using DOM manipulation and localStorage without full reloads.

---

## 🛠️ Technologies Used

- **HTML5** – Semantic and accessible markup
- **CSS3** – Layout and responsive design using Flexbox & Grid
- **Vanilla JavaScript (ES6+)** – No external frameworks used
- **Local Storage API** – For wishlist and user preference persistence
- **Fetch API** – To retrieve data from the [Gutenberg Books API](https://gutendex.com/books)
- **Font Awesome** – For UI icons like wishlist hearts

---

## 📁 Project Structure

```
gutenberg-books/
├── index.html              # Home page with book listing
├── book.html               # Book details page
├── wishlist.html           # Wishlist page (from localStorage)
├── css/
│   └── styles.css          # Global and responsive styles
└── js/
    ├── app.js              # Core logic for homepage
    ├── api.js              # Handles data fetching from the API
    ├── book.js             # Book details logic
    ├── storage.js          # Manages wishlist in localStorage
    ├── ui.js               # DOM rendering and manipulation
    └── wishlist.js         # Wishlist page logic
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Git installed on your machine (optional, for local setup)

### 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gaznafis007/gutenberg-books.git
   ```

2. Navigate into the project folder:
   ```bash
   cd gutenberg-books
   ```

3. Open `index.html` in your browser, or serve using a local server like `Live Server` (VSCode) or `http-server`.

---

## 🧠 Design Principles

- **Modular Architecture** – Organized JS files by responsibility
- **SOLID Principles** – Separation of concerns, single responsibility
- **No Page Reloads** – SPA-like experience using JavaScript only
- **Minimalist UI** – Clean layout without using UI templates

---

## 📌 Notes

- This project avoids using frameworks like React/Vue to emphasize vanilla JS mastery.
- All dynamic actions (search, filter, wishlist toggle) are handled client-side using JavaScript.
- The project was built as part of a challenge to demonstrate functional, modular, and responsive web development.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 🔗 Author

**Gazi Nafis Md Abdullah**  
🔗 [LinkedIn](https://www.linkedin.com/in/gazi-nafis-4712771a4/) | 🌍 [Portfolio](https://gazi-nafis-rafi.vercel.app/) | 💻 Full Stack Developer


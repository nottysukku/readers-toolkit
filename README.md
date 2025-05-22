





# 📚 Readers-Toolkit

**Readers-Toolkit** is a personal reading log web app built with React. It allows users to keep track of books they’ve read, including titles, authors, ISBNs, ratings, read dates, and personal notes. Book information can be fetched automatically using the Open Library API, and cover images are displayed based on ISBNs.

---

## 🚀 Features

- ✅ Add, edit, and delete books
- 📆 Sort books by title, author, date read, or rating (ascending/descending)
- 📖 View detailed book pages with metadata and notes
- 🔍 Fetch book details automatically from the Open Library API using ISBN
- 🖼️ Display book cover images from Open Library
- 💾 Data persistence via `localStorage`
- 🧠 Global state management with React Context API
- 🔁 Client-side routing with `react-router-dom`

---



## 🛠️ Tech Stack

- **React**
- **React Router DOM**
- **Context API**
- **CSS**
- **Open Library API**

---

## 📁 Folder Structure

```

readers-toolkit/
├── public/
│   └── placeholder-cover.png
├── src/
│   ├── components/
│   │   ├── BookList.js
│   │   ├── BookForm.js
│   │   ├── BookDetail.js
│   │   ├── Header.js
│   │   └── Footer.js
│   ├── context/
│   │   └── BookContext.js
│   ├── styles/
│   │   ├── BookList.css
│   │   ├── BookForm.css
│   │   └── BookDetail.css
│   ├── App.js
│   └── index.js

````

---

## ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/readers-toolkit.git
   cd readers-toolkit
````

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm start
   ```

4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🔄 Features Overview

### 📋 Book List (`/`)

* View all added books in a grid layout
* Sort by title, author, rating, or read date
* Click a book title to view its details
* Edit or delete books

### ➕ Add Book (`/books/new`)

* Fill in form fields (title, author, rating, etc.)
* Optional: Enter ISBN and click “Fetch Book Info” to auto-fill data

### ✏️ Edit Book (`/books/:id/edit`)

* Pre-filled form for updating book details

### 🔍 Book Detail (`/books/:id`)

* View full details of the selected book
* Includes notes and large cover image

---

## 🔌 Open Library API

The app fetches book data using the following endpoint:

```
https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json&jscmd=data
```

Cover images are retrieved via:

```
https://covers.openlibrary.org/b/isbn/{isbn}-M.jpg
```

If no cover is available, a placeholder image is shown.

---

## 💡 Future Improvements

* User authentication
* Cloud-based storage (e.g., Firebase, MongoDB)
* Search functionality
* Tags and genres
* Export to CSV or JSON

---

## 📄 License

MIT License. See `LICENSE` file for details.

---

## 🙌 Acknowledgements

* [Open Library API](https://openlibrary.org/developers/api)
* [React](https://reactjs.org/)
* [React Router](https://reactrouter.com/)

---

## 📬 Contact

For questions, contact \[[your-email@example.com](mailto:your-email@example.com)] or open an issue on GitHub.

```

Would you like me to create a `LICENSE` file or example screenshots section too?
```

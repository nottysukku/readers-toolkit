import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import '../styles/BookList.css';
const BookList = () => {
  const { books, deleteBook } = useBooks();
  const [sortBy, setSortBy] = useState('date_read');
  const [order, setOrder] = useState('DESC');

  const sortBooks = (booksArray) => {
    return [...booksArray].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      return order === 'DESC' 
        ? valueB.localeCompare(valueA)
        : valueA.localeCompare(valueB);
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(id);
    }
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    if (name === 'sortBy') setSortBy(value);
    if (name === 'order') setOrder(value);
  };

  const sortedBooks = sortBooks(books);

  return (
    <div className="container">
      <h1>My Reading List</h1>
      
      <div className="sort-controls">
        <form>
          <label htmlFor="sortBy">Sort by:</label>
          <select 
            name="sortBy" 
            id="sortBy" 
            value={sortBy} 
            onChange={handleSort}
          >
            <option value="date_read">Date Read</option>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
          
          <label htmlFor="order">Order:</label>
          <select 
            name="order" 
            id="order" 
            value={order} 
            onChange={handleSort}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </form>
      </div>
      
      <Link to="/books/new" className="btn">Add New Book</Link>
      
      <div className="books-grid">
        {sortedBooks.length > 0 ? (
          sortedBooks.map(book => (
            <div key={book.id} className="book-card">
              <div className="book-cover">
                {book.isbn ? (
                  <img 
                    src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} 
                    alt={`${book.title} cover`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-cover.png';
                    }}
                  />
                ) : (
                  <div className="no-cover">No Cover</div>
                )}
              </div>
              <div className="book-details">
                <h2>
                  <Link to={`/books/${book.id}`}>{book.title}</Link>
                </h2>
                <p className="author">by {book.author}</p>
                <div className="book-meta">
                  <span className="rating">
                    Rating: <strong>{book.rating}/10</strong>
                  </span>
                  <span className="date">
                    Read: {new Date(book.date_read).toLocaleDateString()}
                  </span>
                </div>
                <div className="book-actions">
                  <Link 
                    to={`/books/${book.id}/edit`} 
                    className="btn small"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(book.id)} 
                    className="btn small danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-books">No books found. Add your first book!</p>
        )}
      </div>
    </div>
  );
};

export default BookList;

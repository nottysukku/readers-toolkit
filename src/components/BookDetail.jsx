import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import '../styles/BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const { getBookById, deleteBook } = useBooks();
  const book = getBookById(parseInt(id));

  if (!book) {
    return (
      <div className="container">
        <h1>Book not found</h1>
        <Link to="/" className="btn">Back to List</Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteBook(book.id);
  };

  return (
    <div className="container">
      <div className="book-detail">
        <div className="book-header">
          <h1>{book.title}</h1>
          <h2>by {book.author}</h2>
        </div>

        <div className="book-content">
          <div className="book-info">
            {book.isbn && (
              <div className="book-cover">
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                  alt={`${book.title} cover`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-cover.png';
                  }}
                />
              </div>
            )}

            <div className="book-meta">
              <p><strong>Rating:</strong> {book.rating}/10</p>
              <p><strong>Date Read:</strong> {new Date(book.date_read).toLocaleDateString()}</p>
              {book.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
            </div>

            <div className="book-actions">
              <Link to={`/books/${book.id}/edit`} className="btn">Edit</Link>
              <button onClick={handleDelete} className="btn danger">Delete</button>
              <Link to="/" className="btn">Back to List</Link>
            </div>
          </div>

          <div className="book-notes">
            <h3>Notes</h3>
            <div className="notes-content">
              {book.notes || 'No notes added.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
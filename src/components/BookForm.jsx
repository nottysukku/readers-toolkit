import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import '../styles/BookForm.css';
const BookForm = () => {
  const { addBook, updateBook, books } = useBooks();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    rating: 5,
    date_read: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const [coverPreview, setCoverPreview] = useState('');

  useEffect(() => {
    if (id) {
      const book = books.find(b => b.id === parseInt(id));
      if (book) {
        setFormData({
          ...book,
          date_read: new Date(book.date_read).toISOString().split('T')[0]
        });
        if (book.isbn) {
          setCoverPreview(`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`);
        }
      }
    }
  }, [id, books]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'isbn') {
      setCoverPreview(`https://covers.openlibrary.org/b/isbn/${value}-M.jpg`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateBook(parseInt(id), formData);
    } else {
      addBook(formData);
    }
    navigate('/');
  };

  const fetchBookInfo = async () => {
    if (!formData.isbn) {
      alert('Please enter an ISBN');
      return;
    }

    try {
      const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${formData.isbn}&format=json&jscmd=data`);
      const data = await response.json();
      const bookKey = `ISBN:${formData.isbn}`;
      
      if (data[bookKey]) {
        const bookData = data[bookKey];
        setFormData(prev => ({
          ...prev,
          title: bookData.title || prev.title,
          author: bookData.authors?.[0]?.name || prev.author
        }));
      } else {
        alert('No book information found for this ISBN.');
      }
    } catch (error) {
      console.error('Error fetching book data:', error);
      alert('Error fetching book data. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>{id ? 'Edit Book' : 'Add New Book'}</h1>
      
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="e.g., 9780123456789"
          />
          <button type="button" onClick={fetchBookInfo} className="btn small">
            Fetch Book Info
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating (1-10):</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="10"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date_read">Date Read:</label>
          <input
            type="date"
            id="date_read"
            name="date_read"
            value={formData.date_read}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="5"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn primary">Save</button>
          <button type="button" onClick={() => navigate('/')} className="btn">
            Cancel
          </button>
        </div>
      </form>

      {coverPreview && (
        <div className="book-preview">
          <h2>Cover Preview</h2>
          <img
            src={coverPreview}
            alt="Book cover preview"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-cover.png';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BookForm;

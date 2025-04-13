import React, { createContext, useContext, useEffect, useState } from 'react';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    const newBook = {
      ...book,
      id: Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setBooks([...books, newBook]);
  };

  const updateBook = (id, updatedBook) => {
    setBooks(books.map(book => 
      book.id === id 
        ? { 
            ...updatedBook, 
            id, // Ensure ID remains unchanged
            updated_at: new Date().toISOString(),
            created_at: book.created_at // Preserve original creation date
          } 
        : book
    ));
  };

  const deleteBook = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  const getBookById = (id) => {
    return books.find(book => book.id === parseInt(id));
  };

  const sortBooks = (sortBy = 'date_read', order = 'DESC') => {
    return [...books].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      return order === 'DESC' 
        ? String(valueB).localeCompare(String(valueA))
        : String(valueA).localeCompare(String(valueB));
    });
  };

  const value = {
    books,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
    sortBooks
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export default BookContext;

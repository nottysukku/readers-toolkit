import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BookDetail from './components/BookDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import "./App.css";
function App() {
  return (
    <div className='asd'>
    <BookProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/:id/edit" element={<BookForm />} />
        </Routes>
        <Footer />
      </Router>
    </BookProvider>
    </div>);
}

export default App;

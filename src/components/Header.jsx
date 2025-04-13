import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
const Header = () => {
  return (
    <header className="app-header">
      <div className="container">
        <Link to="/" className="logo">
          Reader's Toolkit
        </Link>
        <nav>
          <Link to="/" className="nav-link">Books</Link>
          <Link to="/books/new" className="nav-link">Add Book</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
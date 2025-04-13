import React from 'react';
import '../styles/Footer.css';
const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Reader's Toolkit. All rights reserved.</p>
        <p>Keep track of your reading journey</p>
      </div>
    </footer>
  );
};

export default Footer;
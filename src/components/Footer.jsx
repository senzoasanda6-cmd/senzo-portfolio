import React from "react";
import { Container } from "react-bootstrap";

const Footer = ({ style }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="py-4"
      style={{
        backgroundColor: '#0d0d0d',
        color: '#ffffff',
        borderTop: '1px solid #333',
        width: '100%',
        ...style
      }}
    >
      <Container>
        <p className="mb-0 text-center">
          &copy; {currentYear} Senzo Dubazana. All Rights Reserved.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#ffffff' }}
          >
            <i className="fab fa-github fa-lg"></i>
          </a>
          <a 
            href="https://linkedin.com/in/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#ffffff' }}
          >
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a 
            href="mailto:your.email@example.com"
            style={{ color: '#ffffff' }}
          >
            <i className="fas fa-envelope fa-lg"></i>
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
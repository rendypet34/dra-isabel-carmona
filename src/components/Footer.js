import React from 'react';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <h3>Dra. Isabel Que Carmona</h3>
          <p>Medicina Estética, Regenerativa y Antiaging</p>
        </div>

        <div className="footer-socials">
          <a href="https://instagram.com/dricarmona7878" target="_blank" rel="noopener noreferrer" className="social-link">
            Instagram
          </a>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Dra. Isabel Que Carmona. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
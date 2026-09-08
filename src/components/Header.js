import React from 'react';
import './Header.css';

function Header({ onOpenAdmin, conteoNuevos = 0 }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Dra. Isabel Que Carmona</h1>
          <p className="subtitle-logo">Medicina Estética & Regenerativa</p>
        </div>
        <nav className="navbar">
          <button onClick={() => scrollToSection('servicios')}>Servicios</button>
          <button onClick={() => scrollToSection('contacto')}>Contacto</button>
          {onOpenAdmin && (
            <button 
              className="btn-header-admin"
              onClick={onOpenAdmin}
              title="Abrir Panel de Prospectos"
            >
              📊 Panel Dra.
              {conteoNuevos > 0 && <span className="header-badge-nuevos">{conteoNuevos}</span>}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
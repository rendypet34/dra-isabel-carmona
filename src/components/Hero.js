import React from 'react';
import './Hero.css';

function Hero() {
  const handleWhatsApp = () => {
    const phoneNumber = '8135536460';
    const message = 'Hola Dra. Isabel, me gustaría agendar una consulta de valoración.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-tag">Medicina Estética & Regenerativa</span>
        <h2 className="hero-title">Belleza que Inspira Confianza</h2>
        <p className="hero-subtitle">
          Tratamientos médicos especializados con los más altos estándares y técnicas de vanguardia 
          para resaltar tu belleza natural y potenciar tu bienestar.
        </p>
        <div className="hero-actions">
          <button className="cta-button" onClick={handleWhatsApp}>
            <i className="fa-brands fa-whatsapp"></i> Agendar Consulta por WhatsApp
          </button>
          <a href="#servicios" className="hero-secondary-btn">
            Ver Tratamientos
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;

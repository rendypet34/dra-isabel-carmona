import React from 'react';
import './Hero.css';

function Hero() {
  const handleWhatsApp = () => {
    const phoneNumber = '8135536460';
    const message = 'Hola Dra. Isabel, me gustaría agendar una consulta.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h2 className="hero-title">Belleza que Inspira Confianza</h2>
        <p className="hero-subtitle">
          Medicina estética de excelencia con los tratamientos más innovadores 
          para realzar tu belleza natural y potenciar tu bienestar.
        </p>
        <button className="cta-button" onClick={handleWhatsApp}>
          📱 Agendar Consulta por WhatsApp
        </button>
      </div>
    </section>
  );
}

export default Hero;

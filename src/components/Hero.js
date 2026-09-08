import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2 className="hero-title">Belleza que Inspira Confianza</h2>
        <p className="hero-subtitle">
          Medicina estética de excelencia con los tratamientos más innovadores 
          para realzar tu belleza natural y potenciar tu bienestar.
        </p>
        <button className="cta-button">Agendar Consulta</button>
      </div>
    </section>
  );
}

export default Hero;
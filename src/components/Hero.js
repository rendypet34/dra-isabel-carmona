import React from 'react';
import './Hero.css';

function Hero() {
  const scrollToContact = () => {
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Dra. Isabel Carmona</h1>
        <p className="hero-subtitle">
          Especialista en Medicina Estética, Rejuvenecimiento Facial y Corporal.
          Cuidado integral y natural para realzar tu mejor versión.
        </p>
        <button className="cta-button" onClick={scrollToContact}>
          Agenda tu Consulta
        </button>
      </div>
    </section>
  );
}

export default Hero;

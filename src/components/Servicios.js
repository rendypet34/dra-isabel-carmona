import React from 'react';
import './Servicios.css';

function Servicios() {
  const servicios = [
    {
      id: 1,
      titulo: 'Medicina Estética Facial',
      descripcion: 'Tratamientos especializados para realzar y rejuvenecer tu rostro con técnicas avanzadas y seguras.',
      icon: '✨'
    },
    {
      id: 2,
      titulo: 'Medicina Estética Corporal',
      descripcion: 'Procedimientos innovadores para modelar y tonificar tu cuerpo, logrando los resultados que deseas.',
      icon: '💎'
    },
    {
      id: 3,
      titulo: 'Control de Peso & Antiaging',
      descripcion: 'Programas personalizados de control de peso y medicina regenerativa para una salud óptima.',
      icon: '🌟'
    }
  ];

  return (
    <section id="servicios" className="servicios">
      <div className="servicios-container">
        <h2 className="servicios-title">Nuestros Servicios</h2>
        <p className="servicios-subtitle">Tratamientos especializados para tu bienestar</p>
        
        <div className="servicios-grid">
          {servicios.map((servicio) => (
            <div key={servicio.id} className="servicio-card">
              <div className="servicio-icon">{servicio.icon}</div>
              <h3 className="servicio-titulo">{servicio.titulo}</h3>
              <p className="servicio-descripcion">{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Servicios;
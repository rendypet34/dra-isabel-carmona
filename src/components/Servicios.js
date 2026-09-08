import React from 'react';
import './Servicios.css';

function Servicios() {
  const servicios = [
    {
      id: 1,
      titulo: 'Armonización & Hidratación de Labios',
      descripcion: 'Perfilado, volumen sutil e hidratación profunda con ácido hialurónico para unos labios definidos, suaves y naturales.',
      icon: '💋'
    },
    {
      id: 2,
      titulo: 'Revitalización de Ojeras',
      descripcion: 'Atenuación de surcos, ojeras hundidas y signos de fatiga para devolver luminosidad y frescura a tu mirada.',
      icon: '👁️'
    },
    {
      id: 3,
      titulo: 'Enzimas Lipolíticas',
      descripcion: 'Tratamiento enzimático avanzado para reducción de grasa localizada y definición en papada, rostro y zonas corporales.',
      icon: '🧪'
    },
    {
      id: 4,
      titulo: 'Bioestimuladores de Colágeno',
      descripcion: 'Activación natural de colágeno para restaurar firmeza, elasticidad y combatir la flacidez con resultados progresivos.',
      icon: '✨'
    },
    {
      id: 5,
      titulo: 'Regeneración Cutánea Facial Avanzada',
      descripcion: 'Protocolos de renovación celular profunda, texturizado, luminosidad y restauración de la salud dérmica.',
      icon: '🌸'
    },
    {
      id: 6,
      titulo: 'Revitalización Capilar Avanzada',
      descripcion: 'Terapias médicas para fortalecer el folículo piloso, frenar la caída del cabello y estimular su crecimiento y densidad.',
      icon: '🌿'
    },
    {
      id: 7,
      titulo: 'Limpiezas Faciales Personalizadas',
      descripcion: 'Higiene facial profunda adaptada a las necesidades específicas de tu tipo de piel, con extracción, hidratación y nutrición.',
      icon: '🫧'
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

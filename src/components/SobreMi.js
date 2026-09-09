import React from 'react';
import doctorPhoto from '../images/c2.jpg';
import './SobreMi.css';

function SobreMi() {
  const handleWhatsApp = () => {
    const phoneNumber = '8135536460';
    const message = 'Hola Dra. Isabel, me gustaría agendar una cita de valoración.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="sobre-mi" className="sobre-mi">
      <div className="sobre-mi-container">
        <div className="sobre-mi-grid">
          <div className="sobre-mi-foto-col">
            <div className="foto-marco">
              <img 
                src={doctorPhoto} 
                alt="Dra. Isabel Que Carmona - Médico Especialista en Medicina Estética" 
                className="doctor-img"
              />
              <div className="foto-badge">
                <i className="fa-solid fa-certificate"></i>
                <span>Médico Certificado</span>
              </div>
            </div>
          </div>

          <div className="sobre-mi-info-col">
            <span className="section-tag">Conoce a tu especialista</span>
            <h2 className="sobre-mi-title">Dra. Isabel Que Carmona</h2>
            <p className="sobre-mi-sub">Medicina Estética, Facial, Corporal & Regenerativa</p>

            <p className="sobre-mi-desc">
              Comprometida con la salud y armonía de cada paciente, la Dra. Isabel Carmona combina 
              criterio médico ético, tecnología de punta y un sentido estético sutil para ofrecer 
              resultados naturales, seguros y duraderos.
            </p>

            <div className="sobre-mi-puntos">
              <div className="punto-card">
                <i className="fa-solid fa-user-doctor"></i>
                <div>
                  <strong>Valoración Personalizada</strong>
                  <span>Diagnóstico médico individual para cada tipo de piel y anatomía.</span>
                </div>
              </div>
              <div className="punto-card">
                <i className="fa-solid fa-shield-halved"></i>
                <div>
                  <strong>Productos de Alta Gama</strong>
                  <span>Solo insumos y marcas con respaldo clínico y certificación oficial.</span>
                </div>
              </div>
              <div className="punto-card">
                <i className="fa-solid fa-heart-pulse"></i>
                <div>
                  <strong>Resultados Naturales</strong>
                  <span>Enfoque en resaltar tu belleza única sin cambios exagerados.</span>
                </div>
              </div>
            </div>

            <div className="sobre-mi-cta">
              <button className="btn-sobre-mi-wa" onClick={handleWhatsApp}>
                <i className="fa-brands fa-whatsapp"></i> Agendar con la Dra. Isabel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SobreMi;

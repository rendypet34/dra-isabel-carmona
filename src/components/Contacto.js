import React from 'react';
import './Contacto.css';

function Contacto() {
  return (
    <section id="contacto" className="contacto">
      <div className="contacto-container">
        <h2 className="contacto-title">Contáctanos</h2>
        
        <div className="contacto-grid">
          <div className="contacto-info">
            <div className="info-card">
              <h3 className="info-titulo">📍 Ubicación</h3>
              <p className="info-texto">
                Calle Abasolo #222<br />
                Centro de Montemorelos<br />
                NL, 67515<br />
                México
              </p>
            </div>

            <div className="info-card">
              <h3 className="info-titulo">📞 Teléfono</h3>
              <p className="info-texto">
                <a href="tel:8135536460">(813) 553-6460</a>
              </p>
            </div>

            <div className="info-card">
              <h3 className="info-titulo">🕐 Horarios</h3>
              <p className="info-texto">
                Lunes a Viernes: 9:00 - 18:00<br />
                Sábado: 9:00 - 14:00<br />
                Domingo: Cerrado
              </p>
            </div>
          </div>

          <div className="contacto-form">
            <form>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Tu nombre" 
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Tu correo" 
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="tel" 
                  placeholder="Tu teléfono" 
                  required
                />
              </div>
              <div className="form-group">
                <textarea 
                  placeholder="Cuéntanos tu consulta..." 
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="form-button">
                Enviar Consulta
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
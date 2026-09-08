import React, { useState } from 'react';
import { guardarProspecto } from '../utils/prospectosStorage';
import './Contacto.css';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    servicio: 'Armonización & Hidratación de Labios',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);
  const [ultimoProspecto, setUltimoProspecto] = useState(null);

  const serviciosList = [
    'Armonización & Hidratación de Labios',
    'Revitalización de Ojeras',
    'Enzimas Lipolíticas',
    'Bioestimuladores de Colágeno',
    'Regeneración Cutánea Facial Avanzada',
    'Revitalización Capilar Avanzada',
    'Limpiezas Faciales Personalizadas',
    'Consulta General / Valoración'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.telefono.trim()) return;

    const guardado = guardarProspecto(formData);
    setUltimoProspecto(guardado);
    setEnviado(true);

    // Limpiar formulario
    setFormData({
      nombre: '',
      telefono: '',
      correo: '',
      servicio: 'Armonización & Hidratación de Labios',
      mensaje: ''
    });
  };

  const abrirWhatsAppDirecto = () => {
    if (!ultimoProspecto) return;
    const msg = `Hola Dra. Isabel Carmona, mi nombre es *${ultimoProspecto.nombre}*. Me gustaría recibir información sobre *${ultimoProspecto.servicio}*. ${ultimoProspecto.mensaje ? `Consulta: ${ultimoProspecto.mensaje}` : ''}`;
    const url = `https://wa.me/528135536460?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contacto" className="contacto">
      <div className="contacto-container">
        <h2 className="contacto-title">Contáctanos & Agenda</h2>
        
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
              <h3 className="info-titulo">📞 Teléfono & WhatsApp</h3>
              <p className="info-texto">
                <a href="tel:8135536460">(813) 553-6460</a>
                <br />
                <a 
                  href="https://wa.me/528135536460?text=Hola%20Dra.%20Isabel,%20me%20gustar%C3%ADa%20agendar%20una%20consulta." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-whatsapp-contacto"
                >
                  💬 Enviar mensaje directo por WhatsApp
                </a>
              </p>
            </div>

            <div className="info-card">
              <h3 className="info-titulo">🕐 Horarios</h3>
              <p className="info-texto">
                Lunes a Jueves: 9:00 - 17:00<br />
                Viernes: 9:00 - 14:00<br />
                Sábado y Domingo: Cerrado
              </p>
            </div>
          </div>

          <div className="contacto-form">
            {enviado ? (
              <div className="form-exito">
                <div className="exito-icono">✨</div>
                <h3>¡Mensaje Recibido con Éxito!</h3>
                <p>
                  Gracias <strong>{ultimoProspecto?.nombre}</strong>. Hemos registrado tu solicitud para{' '}
                  <strong>{ultimoProspecto?.servicio}</strong>. La Dra. Isabel o su asistente se comunicarán contigo a la brevedad.
                </p>
                
                <div className="exito-acciones">
                  <button type="button" className="btn-exito-wa" onClick={abrirWhatsAppDirecto}>
                    💬 Confirmar ahora por WhatsApp
                  </button>
                  <button type="button" className="btn-exito-nuevo" onClick={() => setEnviado(false)}>
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo *</label>
                  <input 
                    type="text" 
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej. María González" 
                    required
                  />
                </div>

                <div className="form-row-doble">
                  <div className="form-group">
                    <label htmlFor="telefono">Teléfono / WhatsApp *</label>
                    <input 
                      type="tel" 
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="Ej. 813 553 6460" 
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="correo">Correo Electrónico (Opcional)</label>
                    <input 
                      type="email" 
                      id="correo"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      placeholder="tucorreo@ejemplo.com" 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="servicio">Tratamiento de Interés</label>
                  <select 
                    id="servicio"
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {serviciosList.map((srv, idx) => (
                      <option key={idx} value={srv}>{srv}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">¿Deseas dejarnos algún detalle o duda?</label>
                  <textarea 
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Cuéntanos tus dudas, disponibilidad de horario o tratamiento de interés..." 
                    rows="4"
                  ></textarea>
                </div>

                <button type="submit" className="form-button">
                  Enviar y Registrar Solicitud
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;

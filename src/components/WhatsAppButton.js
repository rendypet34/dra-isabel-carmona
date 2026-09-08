import React from 'react';
import './WhatsAppButton.css';

function WhatsAppButton({ phoneNumber = '528135536460', message = 'Hola Dra. Isabel, me gustaría solicitar información y agendar una consulta.' }) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp a la Dra. Isabel Carmona"
    >
      <div className="whatsapp-tooltip">¡Escríbenos por WhatsApp!</div>
      <svg
        className="whatsapp-icon"
        viewBox="0 0 32 32"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.647.734 5.215 2.128 7.433L2.05 30l6.764-2.036A13.935 13.935 0 0016.002 30C23.723 30 30 23.722 30 16.002 30 8.28 23.723 2 16.002 2zm7.98 19.98c-.333.938-1.644 1.724-2.695 1.95-.718.154-1.656.277-4.81-1.03-4.034-1.67-6.643-5.753-6.844-6.02-.202-.268-1.637-2.176-1.637-4.15 0-1.974 1.034-2.946 1.4-3.348.368-.402.804-.503 1.072-.503.268 0 .536.003.77.014.248.012.58-.094.908.694.335.79 1.144 2.784 1.244 2.986.1.202.167.436.033.704-.134.268-.201.436-.402.67-.2.235-.422.525-.603.704-.202.2-.413.418-.178.82.235.402 1.043 1.72 2.237 2.784 1.536 1.368 2.83 1.792 3.232 1.993.402.2.637.168.871-.1.234-.268 1.004-1.172 1.272-1.574.268-.402.536-.335.904-.201.368.134 2.344 1.105 2.746 1.306.402.2.67.302.77.47.1.167.1 1.005-.233 1.943z"/>
      </svg>
    </a>
  );
}

export default WhatsAppButton;

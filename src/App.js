import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Contacto from './components/Contacto';
import WhatsAppButton from './components/WhatsAppButton';
import AdminPanel from './components/AdminPanel';
import { getProspectos } from './utils/prospectosStorage';
import './App.css';

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [conteoNuevos, setConteoNuevos] = useState(0);

  useEffect(() => {
    // Calcular prospectos nuevos para el badge
    const actualizarBadge = () => {
      const lista = getProspectos();
      const nuevos = lista.filter((p) => p.estado === 'nuevo').length;
      setConteoNuevos(nuevos);
    };

    actualizarBadge();
    const interval = setInterval(actualizarBadge, 3000);
    return () => clearInterval(interval);
  }, [isAdminOpen]);

  return (
    <div className="App">
      <header className="navbar">
        <div className="nav-container">
          <span className="nav-brand">Dra. Isabel Carmona</span>
          <nav className="nav-links">
            <a href="#servicios">Servicios</a>
            <a href="#contacto">Contacto</a>
            <button 
              className="btn-nav-admin" 
              onClick={() => setIsAdminOpen(true)}
              title="Abrir Panel de Prospectos"
            >
              📊 Panel Dra.
              {conteoNuevos > 0 && <span className="nav-badge-nuevos">{conteoNuevos}</span>}
            </button>
          </nav>
        </div>
      </header>
      <main>
        <Hero />
        <Servicios />
        <Contacto />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Dra. Isabel Carmona · Medicina Estética. Todos los derechos reservados.</p>
        <button className="footer-admin-link" onClick={() => setIsAdminOpen(true)}>
          🔐 Acceso Panel Administrativo
        </button>
      </footer>
      <WhatsAppButton />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default App;

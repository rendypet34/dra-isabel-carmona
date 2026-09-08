import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminPanel from './components/AdminPanel';
import { getProspectos } from './utils/prospectosStorage';

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [conteoNuevos, setConteoNuevos] = useState(0);

  useEffect(() => {
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
      <Header onOpenAdmin={() => setIsAdminOpen(true)} conteoNuevos={conteoNuevos} />
      <Hero />
      <Servicios />
      <Contacto />
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      <WhatsAppButton />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default App;
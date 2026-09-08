import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Servicios />
      <Contacto />
      <Footer />
    </div>
  );
}

export default App;
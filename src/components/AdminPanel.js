import React, { useState, useEffect } from 'react';
import {
  getProspectos,
  actualizarProspecto,
  eliminarProspecto,
  exportarCSV
} from '../utils/prospectosStorage';
import './AdminPanel.css';

const ADMIN_USER = 'icarmona';
const ADMIN_PASS = 'Carmona01';
const SESSION_AUTH_KEY = 'dra_carmona_auth';

function AdminPanel({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const [prospectos, setProspectos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [notaEdicion, setNotaEdicion] = useState({ id: null, texto: '' });

  useEffect(() => {
    if (isOpen) {
      const isLogged = sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
      setIsAuthenticated(isLogged);
      if (isLogged) {
        cargarDatos();
      }
    } else {
      setLoginError('');
      setLoginUser('');
      setLoginPass('');
    }
  }, [isOpen]);

  const cargarDatos = () => {
    setProspectos(getProspectos());
  };

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginUser.trim() === ADMIN_USER && loginPass === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      setIsAuthenticated(true);
      setLoginError('');
      cargarDatos();
    } else {
      setLoginError('Usuario o contraseña incorrectos.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    setIsAuthenticated(false);
    setLoginUser('');
    setLoginPass('');
  };

  const handleCambiarEstado = (id, nuevoEstado) => {
    actualizarProspecto(id, { estado: nuevoEstado });
    cargarDatos();
  };

  const handleGuardarNota = (id) => {
    actualizarProspecto(id, { notas: notaEdicion.texto });
    setNotaEdicion({ id: null, texto: '' });
    cargarDatos();
  };

  const handleEliminar = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar el registro de ${nombre || 'este prospecto'}?`)) {
      eliminarProspecto(id);
      cargarDatos();
    }
  };

  const getWhatsAppLink = (telefono, nombre, servicio) => {
    const cleanPhone = (telefono || '').replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `52${cleanPhone}` : cleanPhone;
    const msg = `Hola ${nombre || ''}, te saluda el equipo de la Dra. Isabel Carmona. Vemos tu interés en ${servicio || 'nuestros tratamientos'}. ¿En qué horario te gustaría agendar tu valoración?`;
    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(msg)}`;
  };

  const prospectosFiltrados = prospectos.filter((p) => {
    const coincideEstado = filtroEstado === 'todos' || p.estado === filtroEstado;
    const searchLower = busqueda.toLowerCase();
    const coincideBusqueda =
      (p.nombre || '').toLowerCase().includes(searchLower) ||
      (p.telefono || '').toLowerCase().includes(searchLower) ||
      (p.correo || '').toLowerCase().includes(searchLower) ||
      (p.servicio || '').toLowerCase().includes(searchLower);
    return coincideEstado && coincideBusqueda;
  });

  const conteos = {
    total: prospectos.length,
    nuevos: prospectos.filter((p) => p.estado === 'nuevo').length,
    contactados: prospectos.filter((p) => p.estado === 'contactado').length,
    agendados: prospectos.filter((p) => p.estado === 'agendado').length,
    descartados: prospectos.filter((p) => p.estado === 'descartado').length
  };

  return (
    <div className="admin-overlay" onClick={(e) => e.target.className === 'admin-overlay' && onClose()}>
      {!isAuthenticated ? (
        <div className="admin-login-card">
          <button className="admin-login-close" onClick={onClose} title="Cerrar">✕</button>
          <div className="admin-login-header">
            <div className="admin-login-icon">
              <i className="fa-solid fa-lock"></i>
            </div>
            <h3>Acceso Administrativo</h3>
            <p>Ingresa tus credenciales para ver prospectos y citas</p>
          </div>

          {loginError && (
            <div className="admin-login-alert">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="admin-login-form">
            <div className="admin-input-group">
              <label>Usuario</label>
              <div className="admin-input-wrapper">
                <i className="fa-regular fa-user"></i>
                <input
                  type="text"
                  placeholder="Usuario (ej. icarmona)"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label>Contraseña</label>
              <div className="admin-input-wrapper">
                <i className="fa-solid fa-key"></i>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-admin-login-submit">
              <span>Ingresar al Panel</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </form>
        </div>
      ) : (
        <div className="admin-modal">
          <header className="admin-header">
            <div>
              <span className="admin-badge">Panel Administrativo</span>
              <h2>Control de Prospectos & Citas</h2>
              <p className="admin-subtitle">Dra. Isabel Que Carmona · Medicina Estética</p>
            </div>
            <div className="admin-actions-top">
              <button className="btn-exportar" onClick={exportarCSV} title="Descargar en Excel/CSV">
                📥 Exportar CSV
              </button>
              <button className="btn-admin-logout" onClick={handleLogout} title="Cerrar sesión">
                <i className="fa-solid fa-right-from-bracket"></i> Salir
              </button>
              <button className="admin-close-btn" onClick={onClose} title="Cerrar panel">
                ✕
              </button>
            </div>
          </header>

        <section className="admin-stats-grid">
          <div className="stat-card stat-total" onClick={() => setFiltroEstado('todos')}>
            <span className="stat-label">Total Recibidos</span>
            <strong className="stat-value">{conteos.total}</strong>
          </div>
          <div className="stat-card stat-nuevo" onClick={() => setFiltroEstado('nuevo')}>
            <span className="stat-label">🟡 Nuevos</span>
            <strong className="stat-value">{conteos.nuevos}</strong>
          </div>
          <div className="stat-card stat-contactado" onClick={() => setFiltroEstado('contactado')}>
            <span className="stat-label">🔵 Contactados</span>
            <strong className="stat-value">{conteos.contactados}</strong>
          </div>
          <div className="stat-card stat-agendado" onClick={() => setFiltroEstado('agendado')}>
            <span className="stat-label">🟢 Citas Agendadas</span>
            <strong className="stat-value">{conteos.agendados}</strong>
          </div>
        </section>

        <div className="admin-toolbar">
          <div className="search-box">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Buscar por nombre, teléfono, correo o servicio..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            {busqueda && (
              <button className="btn-clear-search" onClick={() => setBusqueda('')}>
                ✕
              </button>
            )}
          </div>

          <div className="filter-group">
            <label>Estado:</label>
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="todos">Todos ({conteos.total})</option>
              <option value="nuevo">🟡 Nuevos ({conteos.nuevos})</option>
              <option value="contactado">🔵 Contactados ({conteos.contactados})</option>
              <option value="agendado">🟢 Agendados ({conteos.agendados})</option>
              <option value="descartado">⚪ Descartados ({conteos.descartados})</option>
            </select>
          </div>
        </div>

        <div className="admin-table-wrapper">
          {prospectosFiltrados.length === 0 ? (
            <div className="admin-empty">
              <span className="empty-icon">📂</span>
              <h3>No hay prospectos en esta sección</h3>
              <p>Los contactos que se registren en el formulario aparecerán aquí en tiempo real.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Paciente</th>
                  <th>Contacto</th>
                  <th>Servicio de Interés</th>
                  <th>Mensaje</th>
                  <th>Estado</th>
                  <th>Notas</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {prospectosFiltrados.map((item) => (
                  <tr key={item.id} className={`row-estado-${item.estado}`}>
                    <td className="td-fecha">
                      {new Date(item.fecha).toLocaleDateString('es-MX', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="td-nombre">
                      <strong>{item.nombre || 'Sin nombre'}</strong>
                    </td>
                    <td className="td-contacto">
                      <div className="contacto-links">
                        {item.telefono && (
                          <a href={`tel:${item.telefono}`} className="link-tel">
                            📞 {item.telefono}
                          </a>
                        )}
                        {item.correo && (
                          <a href={`mailto:${item.correo}`} className="link-mail">
                            ✉️ {item.correo}
                          </a>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="service-pill">{item.servicio || 'General'}</span>
                    </td>
                    <td className="td-mensaje" title={item.mensaje}>
                      <div className="mensaje-clamp">{item.mensaje || '—'}</div>
                    </td>
                    <td>
                      <select
                        className={`status-select status-${item.estado}`}
                        value={item.estado}
                        onChange={(e) => handleCambiarEstado(item.id, e.target.value)}
                      >
                        <option value="nuevo">🟡 Nuevo</option>
                        <option value="contactado">🔵 Contactado</option>
                        <option value="agendado">🟢 Agendado</option>
                        <option value="descartado">⚪ Descartado</option>
                      </select>
                    </td>
                    <td className="td-notas">
                      {notaEdicion.id === item.id ? (
                        <div className="nota-editor">
                          <input
                            type="text"
                            value={notaEdicion.texto}
                            onChange={(e) => setNotaEdicion({ ...notaEdicion, texto: e.target.value })}
                            placeholder="Añadir nota..."
                            autoFocus
                          />
                          <div className="nota-btns">
                            <button className="btn-nota-save" onClick={() => handleGuardarNota(item.id)}>✓</button>
                            <button className="btn-nota-cancel" onClick={() => setNotaEdicion({ id: null, texto: '' })}>✕</button>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="nota-display"
                          onClick={() => setNotaEdicion({ id: item.id, texto: item.notas || '' })}
                          title="Clic para editar nota"
                        >
                          {item.notas ? (
                            <span className="nota-text">📝 {item.notas}</span>
                          ) : (
                            <span className="nota-placeholder">+ Agregar nota</span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="td-acciones">
                      <div className="action-buttons">
                        {item.telefono && (
                          <a
                            href={getWhatsAppLink(item.telefono, item.nombre, item.servicio)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-action-wa"
                            title="Abrir WhatsApp con mensaje listo"
                            onClick={() => {
                              if (item.estado === 'nuevo') {
                                handleCambiarEstado(item.id, 'contactado');
                              }
                            }}
                          >
                            💬 WhatsApp
                          </a>
                        )}
                        <button
                          className="btn-action-del"
                          onClick={() => handleEliminar(item.id, item.nombre)}
                          title="Eliminar registro"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )}
    </div>
  );
}

export default AdminPanel;

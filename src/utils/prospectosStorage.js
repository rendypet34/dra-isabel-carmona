const STORAGE_KEY = 'dra_carmona_prospectos';

// Obtener todos los prospectos ordenados por fecha descendente
export const getProspectos = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error al leer prospectos:', error);
    return [];
  }
};

// Guardar un nuevo prospecto
export const guardarProspecto = (prospecto) => {
  try {
    const lista = getProspectos();
    const nuevo = {
      id: Date.now().toString(),
      fecha: new Date().toISOString(),
      nombre: prospecto.nombre || '',
      telefono: prospecto.telefono || '',
      correo: prospecto.correo || '',
      servicio: prospecto.servicio || 'Consulta General',
      mensaje: prospecto.mensaje || '',
      estado: 'nuevo', // 'nuevo' | 'contactado' | 'agendado' | 'descartado'
      notas: ''
    };
    lista.unshift(nuevo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    return nuevo;
  } catch (error) {
    console.error('Error al guardar prospecto:', error);
    return null;
  }
};

// Actualizar estado o notas de un prospecto
export const actualizarProspecto = (id, camposActualizados) => {
  try {
    const lista = getProspectos();
    const index = lista.findIndex((p) => p.id === id);
    if (index !== -1) {
      lista[index] = { ...lista[index], ...camposActualizados };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
      return lista[index];
    }
    return null;
  } catch (error) {
    console.error('Error al actualizar prospecto:', error);
    return null;
  }
};

// Eliminar un prospecto
export const eliminarProspecto = (id) => {
  try {
    const lista = getProspectos();
    const filtrada = lista.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtrada));
    return true;
  } catch (error) {
    console.error('Error al eliminar prospecto:', error);
    return false;
  }
};

// Exportar a CSV para Excel
export const exportarCSV = () => {
  const lista = getProspectos();
  if (lista.length === 0) return;

  const headers = ['ID', 'Fecha', 'Nombre', 'Teléfono', 'Correo', 'Servicio', 'Mensaje', 'Estado', 'Notas'];
  const rows = lista.map((p) => [
    `"${p.id}"`,
    `"${new Date(p.fecha).toLocaleString('es-MX')}"`,
    `"${(p.nombre || '').replace(/"/g, '""')}"`,
    `"${(p.telefono || '').replace(/"/g, '""')}"`,
    `"${(p.correo || '').replace(/"/g, '""')}"`,
    `"${(p.servicio || '').replace(/"/g, '""')}"`,
    `"${(p.mensaje || '').replace(/"/g, '""')}"`,
    `"${p.estado}"`,
    `"${(p.notas || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `prospectos_dra_carmona_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

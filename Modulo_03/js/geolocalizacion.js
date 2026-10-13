document.getElementById('btnGeo').addEventListener('click', () => {
  const contenedor = document.getElementById('resultadoGeo');
  
  if (!navigator.geolocation) {
    contenedor.innerHTML = '❌ Tu navegador no soporta la API de Geolocalización.';
    return;
  }

  contenedor.innerHTML = '🔄 Solicitando ubicación al navegador...';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const precision = position.coords.accuracy;
      
      contenedor.innerHTML = `✅ ¡Ubicación obtenida con éxito!<br>` +
                             `Latitud: ${lat.toFixed(4)}<br>` +
                             `Longitud: ${lon.toFixed(4)}<br>` +
                             `Precisión: ~${precision} metros`;
    },
    (error) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          contenedor.innerHTML = '❌ El usuario denegó el permiso de geolocalización.';
          break;
        case error.POSITION_UNAVAILABLE:
          contenedor.innerHTML = '❌ La información de ubicación no está disponible.';
          break;
        case error.TIMEOUT:
          contenedor.innerHTML = '❌ La petición para obtener la ubicación expiró.';
          break;
        default:
          contenedor.innerHTML = '❌ Ocurrió un error desconocido.';
          break;
      }
    },
    { timeout: 10000, maximumAge: 60000 }
  );
});
document.getElementById('btnFetch').addEventListener('click', async () => {
  const contenedor = document.getElementById('resultadoFetch');
  contenedor.textContent = '⏳ Cargando datos desde la API...';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!response.ok) throw new Error('Error en la respuesta del servidor');
    const data = await response.json();
    
    contenedor.textContent = `✅ ¡Datos obtenidos con éxito!\n\n` +
                             `Nombre: ${data.name}\n` +
                             `Email: ${data.email}\n` +
                             `Ciudad: ${data.address.city}\n` +
                             `Empresa: ${data.company.name}`;
  } catch (error) {
    contenedor.textContent = `❌ Error al realizar la petición: ${error.message}`;
  }
});
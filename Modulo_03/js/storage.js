const inputDato = document.getElementById('inputDato');
const btnGuardar = document.getElementById('btnGuardar');
const btnBorrar = document.getElementById('btnBorrar');
const valorAlmacenado = document.getElementById('valorAlmacenado');

// Cargar valor previo si existe
const datoActual = localStorage.getItem('miDatoClave');
if (datoActual) {
  valorAlmacenado.textContent = datoActual;
  inputDato.value = datoActual;
}

btnGuardar.addEventListener('click', () => {
  const valor = inputDato.value.trim();
  if (valor !== '') {
    localStorage.setItem('miDatoClave', valor);
    valorAlmacenado.textContent = valor;
    alert('¡Dato guardado con éxito en localStorage!');
  } else {
    alert('Por favor, escribe un texto antes de guardar.');
  }
});

btnBorrar.addEventListener('click', () => {
  localStorage.removeItem('miDatoClave');
  inputDato.value = '';
  valorAlmacenado.textContent = 'Ninguno';
  alert('Dato eliminado del almacenamiento local.');
});
// document.addEventListener('DOMContentLoaded', () => {
//   const canvas = document.getElementById('miLienzo');
  
//   if (canvas && canvas.getContext) {
//     const ctx = canvas.getContext('2d');
//     let dibujando = false;

//     // Mensaje inicial en el lienzo
//     ctx.font = '16px Arial';
//     ctx.fillStyle = '#64748b';
//     ctx.fillText('Haz clic y arrastra para dibujar...', 10, 30);

//     // Funciones para calcular la posición exacta del cursor en el canvas
//     function obtenerPosicion(e) {
//       const rect = canvas.getBoundingClientRect();
//       return {
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top
//       };
//     }

//     function empezarDibujo(e) {
//       dibujando = true;
//       const pos = obtenerPosicion(e);
//       ctx.beginPath();
//       ctx.moveTo(pos.x, pos.y);
//     }

//     function dibujar(e) {
//       if (!dibujando) return;
//       const pos = obtenerPosicion(e);
//       ctx.lineWidth = 3;
//       ctx.lineCap = 'round';
//       ctx.strokeStyle = '#0284c7'; // Color azul
      
//       ctx.lineTo(pos.x, pos.y);
//       ctx.stroke();
//     }

//     function detenerDibujo() {
//       dibujando = false;
//       ctx.beginPath();
//     }

//     // Eventos del Ratón
//     canvas.addEventListener('mousedown', empezarDibujo);
//     canvas.addEventListener('mousemove', dibujar);
//     canvas.addEventListener('mouseup', detenerDibujo);
//     canvas.addEventListener('mouseleave', detenerDibujo);
//   }
// });

// -----------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('miLienzo');
  const inputColor = document.getElementById('colorPincel');
  const inputGrosor = document.getElementById('grosorPincel');
  const valorGrosor = document.getElementById('valorGrosor');
  const btnLimpiar = document.getElementById('btnLimpiar');
  
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let dibujando = false;

    // Actualizar indicador numérico del grosor
    if (inputGrosor && valorGrosor) {
      inputGrosor.addEventListener('input', (e) => {
        valorGrosor.textContent = e.target.value;
      });
    }

    // Limpiar el lienzo
    if (btnLimpiar) {
      btnLimpiar.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    }

    function obtenerPosicion(e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }

    function empezarDibujo(e) {
      dibujando = true;
      const pos = obtenerPosicion(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    function dibujar(e) {
      if (!dibujando) return;
      const pos = obtenerPosicion(e);
      
      // Aplicar color y grosor elegidos
      ctx.lineWidth = inputGrosor ? inputGrosor.value : 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = inputColor ? inputColor.value : '#0284c7';
      
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    function detenerDibujo() {
      dibujando = false;
      ctx.beginPath();
    }

    // Eventos de ratón
    canvas.addEventListener('mousedown', empezarDibujo);
    canvas.addEventListener('mousemove', dibujar);
    canvas.addEventListener('mouseup', detenerDibujo);
    canvas.addEventListener('mouseleave', detenerDibujo);
  }
});
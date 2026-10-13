const canvas = document.getElementById('miLienzo');
const ctx = canvas.getContext('2d');

document.getElementById('btnRectangulo').addEventListener('click', () => {
  ctx.fillStyle = '#2196F3';
  ctx.fillRect(50, 50, 150, 100);
});

document.getElementById('btnCirculo').addEventListener('click', () => {
  ctx.beginPath();
  ctx.arc(350, 100, 50, 0, 2 * Math.PI);
  ctx.fillStyle = '#4CAF50';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#fff';
  ctx.stroke();
});

document.getElementById('btnLimpiar').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
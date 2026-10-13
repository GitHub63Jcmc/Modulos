const item = document.getElementById('elementoArrastrable');
const zonas = document.querySelectorAll('.drop-zone');

item.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', e.target.id);
  setTimeout(() => item.style.opacity = '0.4', 0);
});

item.addEventListener('dragend', () => {
  item.style.opacity = '1';
});

zonas.forEach(zona => {
  zona.addEventListener('dragover', (e) => {
    e.preventDefault();
    zona.classList.add('hover');
  });

  zona.addEventListener('dragleave', () => {
    zona.classList.remove('hover');
  });

  zona.addEventListener('drop', (e) => {
    e.preventDefault();
    zona.classList.remove('hover');
    const id = e.dataTransfer.getData('text/plain');
    const elementoArrastrado = document.getElementById(id);
    zona.appendChild(elementoArrastrado);
  });
});
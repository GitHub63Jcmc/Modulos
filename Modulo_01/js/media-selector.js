

document.addEventListener('DOMContentLoaded', () => {
  const selectVideo = document.getElementById('selectVideo');
  const reproductorVideo = document.getElementById('reproductorVideo');
  
  const selectAudio = document.getElementById('selectAudio');
  const reproductorAudio = document.getElementById('reproductorAudio');

  // Carga dinámica de vídeo
  if (selectVideo && reproductorVideo) {
    selectVideo.addEventListener('change', (e) => {
      const archivo = e.target.files[0];
      if (archivo) {
        const urlArchivo = URL.createObjectURL(archivo);
        reproductorVideo.src = urlArchivo;
        reproductorVideo.play();
      }
    });
  }

  // Carga dinámica de audio
  if (selectAudio && reproductorAudio) {
    selectAudio.addEventListener('change', (e) => {
      const archivo = e.target.files[0];
      if (archivo) {
        const urlArchivo = URL.createObjectURL(archivo);
        reproductorAudio.src = urlArchivo;
        reproductorAudio.play();
      }
    });
  }
});
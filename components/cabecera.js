
class MiCabecera extends HTMLElement {
  connectedCallback() {
    this.style.display = 'block';

    const moduloActual = this.getAttribute('modulo') || '1';
    const paginaActiva = this.getAttribute('pagina') || 'index.html';

    // Titulares para cada módulo
    const titulosModulos = {
      '1': 'Módulo 1: HTML5 Semántico y Multimedia',
      '2': 'Módulo 2: CSS3 Avanzado',
      '3': 'Módulo 3: Principales APIs de HTML5'
    };

    // Pestañas internas por módulo
    const pestañasModulos = {
      '1': [
        { url: 'index.html', texto: 'Artículos' },
        { url: 'multimedia.html', texto: 'Multimedia' },
        { url: 'canvas.html', texto: 'Canvas API' },
        { url: 'formulario.html', texto: 'Formulario' }
      ],
      '2': [
        { url: 'index.html', texto: 'Selectores y Pseudo' },
        { url: 'bordes-sombras.html', texto: 'Bordes, Sombras y Degradados' },
        { url: 'tipografia.html', texto: 'Tipografía Web' },
        { url: 'maquetacion.html', texto: 'Flexbox y Grid' },
        { url: 'animaciones.html', texto: 'Animaciones 2D/3D' }
      ],
      '3': [
        { url: 'index.html', texto: 'Geolocalización' },
        { url: 'storage.html', texto: 'Web Storage' },
        { url: 'fetch.html', texto: 'Fetch API' },
        { url: 'drag-drop.html', texto: 'Drag & Drop' }
      ]
    };

    // Construcción dinámica de botones de navegación entre módulos
    let botonesNavegacion = `<a href="../index.html" class="btn-home" title="Volver al Portal Principal">&larr; Portal</a>`;

    if (moduloActual === '1') {
      botonesNavegacion += `<a href="../Modulo_02/index.html" class="btn-home">Módulo 2 &rarr;</a>`;
      botonesNavegacion += `<a href="../Modulo_03/index.html" class="btn-home">Módulo 3 &rarr;</a>`;
    } else if (moduloActual === '2') {
      botonesNavegacion += `<a href="../Modulo_01/index.html" class="btn-home">&larr; Módulo 1</a>`;
      botonesNavegacion += `<a href="../Modulo_03/index.html" class="btn-home">Módulo 3 &rarr;</a>`;
    } else if (moduloActual === '3') {
      botonesNavegacion += `<a href="../Modulo_01/index.html" class="btn-home">&larr; Módulo 1</a>`;
      botonesNavegacion += `<a href="../Modulo_02/index.html" class="btn-home">&larr; Módulo 2</a>`;
    }

    const pestañas = pestañasModulos[moduloActual] || [];

    // Generar los enlaces de las pestañas internas
    const htmlPestañas = pestañas.map(item => {
      const esActivo = item.url === paginaActiva ? 'class="active"' : '';
      return `<a href="${item.url}" ${esActivo}>${item.texto}</a>`;
    }).join('');

    // Renderizado final del componente
    this.innerHTML = `
      <header class="cabecera-modulo">
        <div class="header-info">
          ${botonesNavegacion}
          <h2>${titulosModulos[moduloActual] || 'Módulo'}</h2>
        </div>

        <nav class="menu-navegacion">
          ${htmlPestañas}
        </nav>
      </header>
    `;
  }
}

customElements.define('mi-cabecera', MiCabecera);
class MiPie extends HTMLElement {
  connectedCallback() {
    this.style.display = 'block';

    const anioActual = new Date().getFullYear();

    this.innerHTML = `
      <footer class="pie-pagina">
        <p>&copy; jcmc ${anioActual} Portal de Módulos de Formación | Curso SEPE: HTML5, CSS3 y JavaScript. Todos los derechos reservados.</p>
      </footer>
    `;
  }
}

customElements.define('mi-pie', MiPie);
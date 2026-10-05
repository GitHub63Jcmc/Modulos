import { WeatherService } from '../js/services/weather-api.js';

class GeoWeather extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.renderLoading();
    this.initGeolocation();
  }

  /**
   * Solicita la ubicación actual con la Geolocation API de HTML5
   */
  initGeolocation() {
    if (!('geolocation' in navigator)) {
      this.renderError('La geolocalización no está soportada en este navegador.');
      return;
    }

    // Opciones para la consulta de ubicación
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => this.fetchWeatherData(position.coords),
      (error) => this.handleGeoError(error),
      options
    );
  }

  /**
   * Llama al servicio del tiempo con las coordenadas obtenidas
   */
  async fetchWeatherData({ latitude, longitude }) {
    try {
      const data = await WeatherService.getWeatherByCoords(latitude, longitude);
      this.render(data, latitude, longitude);
    } catch (error) {
      this.renderError('No se pudieron obtener los datos meteorológicos.');
    }
  }

  /**
   * Manejo de errores de permisos o señal de la Geolocation API
   */
  handleGeoError(error) {
    const messages = {
      1: 'Permiso de ubicación denegado por el usuario.',
      2: 'Ubicación no disponible.',
      3: 'Tiempo de espera agotado al obtener la ubicación.'
    };
    this.renderError(messages[error.code] || 'Error desconocido de geolocalización.');
  }

  /* --- MÉTODOS DE RENDERIZADO EN EL SHADOW DOM --- */

  renderLoading() {
    this.shadowRoot.innerHTML = `
      ${this.getStyles()}
      <div class="weather-card">
        <p class="status">Obteniendo ubicación...</p>
      </div>
    `;
  }

  renderError(message) {
    this.shadowRoot.innerHTML = `
      ${this.getStyles()}
      <div class="weather-card error">
        <p class="status">⚠️ ${message}</p>
      </div>
    `;
  }

  render(data, lat, lon) {
    this.shadowRoot.innerHTML = `
      ${this.getStyles()}
      <div class="weather-card">
        <h2>Clima Actual en: <span class="azul">${data.location}</span></h2>
        <div class="temp-display">
          <span class="temp">${data.temperature}</span>
          <span class="unit">${data.units}</span>
        </div>
        <div class="details">
          <p>💨 Viento: <strong>${data.windspeed} km/h</strong></p>
          <p class="coords">📍 Coordenadas: ${lat.toFixed(2)}°, ${lon.toFixed(2)}°</p>
        </div>
      </div>
    `;
  }

  getStyles() {
    return `
      <style>
        :host {
          display: block;
          font-family: inherit;
        }
        .weather-card {
          padding: 1.5rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }
        .azul {
          color: #246cf1;
        }
        .weather-card.error {
          border-color: #ff5555;
          color: #ff7777;
        }
        .temp-display {
          margin: 1rem 0;
        }
        .temp {
          font-size: 3rem;
          font-weight: bold;
        }
        .unit {
          font-size: 1.5rem;
          vertical-align: top;
        }
        .details {
          font-size: 0.9rem;
          opacity: 0.8;
        }
        .coords {
          font-size: 0.75rem;
          margin-top: 0.5rem;
        }
      </style>
    `;
  }
}

customElements.define('geo-weather', GeoWeather);
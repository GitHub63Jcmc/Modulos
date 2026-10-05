/**
 * Servicio para consultar el tiempo y geocodificación inversa mediante Fetch API
 */
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';
const REVERSE_GEO_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export const WeatherService = {
  /**
   * Obtiene la temperatura actual y el nombre del municipio según las coordenadas
   */
  async getWeatherByCoords(latitude, longitude) {
    const weatherFetch = `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const geoFetch = `${REVERSE_GEO_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`;

    try {
      const [weatherRes, geoRes] = await Promise.all([
        fetch(weatherFetch),
        fetch(geoFetch)
      ]);

      if (!weatherRes.ok) {
        throw new Error(`Error en la petición del clima: ${weatherRes.status}`);
      }

      const weatherData = await weatherRes.json();
      let locationName = 'Tu ubicación';

      if (geoRes.ok) {
        const geoData = await geoRes.json();
        // Extrae el municipio, ciudad o localidad devuelta
        locationName = geoData.city || geoData.locality || geoData.principalSubdivision || locationName;
      }

      return {
        location: locationName,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weathercode: weatherData.current_weather.weathercode,
        units: weatherData.current_weather_units?.temperature || '°C'
      };
    } catch (error) {
      console.error('Error al consultar WeatherService:', error);
      throw error;
    }
  }
};
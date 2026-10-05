/**
 * Servicio para consultar el tiempo meteorológico usando Fetch API
 */
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const WeatherService = {
  /**
   * Obtiene la temperatura actual dada una latitud y longitud
   * @param {number} latitude 
   * @param {number} longitude 
   * @returns {Promise<Object>} Datos formateados del clima
   */
  async getWeatherByCoords(latitude, longitude) {
    const url = `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {
      const response = await fetch(url);

      // Verificamos si la respuesta HTTP es correcta (status 200-299)
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        weathercode: data.current_weather.weathercode,
        units: data.current_weather_units?.temperature || '°C'
      };
    } catch (error) {
      console.error('Error al consultar WeatherService:', error);
      throw error;
    }
  }
};
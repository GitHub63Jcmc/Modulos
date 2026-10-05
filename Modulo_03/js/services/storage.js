/**
 * Helper para abstraer el uso de localStorage con objetos JSON
 */
export const StorageService = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error al leer '${key}' de localStorage:`, error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error al guardar '${key}' en localStorage:`, error);
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  }
};
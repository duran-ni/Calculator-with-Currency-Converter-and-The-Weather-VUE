// Mapa de iconos según el id de "stateSky" (AEMET / el-tiempo.net).
// Tabla completa verificada en la documentación oficial de AEMET:
// https://www.aemet.es/es/eltiempo/prediccion/municipios/ayuda (sección "Estado del cielo")
const SKY_ICONS = {
  11: '☀️', '11n': '🌙',
  12: '🌤️', '12n': '🌙',
  13: '⛅', '13n': '🌙',
  14: '🌥️', '14n': '☁️',
  15: '☁️',
  16: '☁️',
  17: '🌥️', '17n': '🌥️',
  43: '🌦️', '43n': '🌦️',
  44: '🌦️', '44n': '🌦️',
  45: '🌦️',
  46: '🌧️',
  23: '🌧️', '23n': '🌧️',
  24: '🌧️', '24n': '🌧️',
  25: '🌧️',
  26: '🌧️',
  71: '🌨️', '71n': '🌨️',
  72: '🌨️', '72n': '🌨️',
  73: '🌨️',
  74: '❄️',
  33: '🌨️', '33n': '🌨️',
  34: '🌨️', '34n': '🌨️',
  35: '🌨️',
  36: '❄️',
  51: '⛈️', '51n': '⛈️',
  52: '⛈️', '52n': '⛈️',
  53: '⛈️',
  54: '⛈️',
  61: '⛈️', '61n': '⛈️',
  62: '⛈️', '62n': '⛈️',
  63: '⛈️',
  64: '⛈️',
  81: '🌫️',
  82: '🌫️',
  83: '🌫️'
}

const DEFAULT_ICON = '☁️'

// Recibe el id de stateSky (ej. "11", "45", "11n") y devuelve el emoji
// correspondiente, o el icono por defecto si no está en la tabla.
export function getSkyIcon(stateSkyId) {
  return SKY_ICONS[stateSkyId] ?? DEFAULT_ICON
}
// Transforma una ciudad cruda de la API de el-tiempo.net en el modelo
// interno que usará la aplicación. Los componentes de vista no deben
// conocer la estructura real de la API (stateSky.id, temperatures.max...);
// solo conocen este modelo (skyId, maxTemp...).
export function mapWeatherCity(rawCity) {
  return {
    name: rawCity.name,
    skyId: rawCity.stateSky.id,
    skyDescription: rawCity.stateSky.description,
    maxTemp: Number(rawCity.temperatures.max),
    minTemp: Number(rawCity.temperatures.min)
  }
}
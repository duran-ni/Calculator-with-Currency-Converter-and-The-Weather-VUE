// Transforma la respuesta cruda de la API de CurrencyFreaks en un modelo
// interno simple: un objeto plano { DIVISA: numero }, desacoplado de la
// forma exacta que use la API (que anida las tasas dentro de "rates"
// y las devuelve como texto, no como número).
export function mapCurrencyRates(apiResponse) {
  const rawRates = apiResponse.rates
  const rates = {}

  for (const currency in rawRates) {
    rates[currency] = Number(rawRates[currency])
  }

  return rates
}
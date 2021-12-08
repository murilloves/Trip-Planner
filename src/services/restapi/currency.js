import { performGetRequest } from './index'

const CURRENCY_BASE_URL = 'https://api.frankfurter.app/latest'

const fetchCurrencies = async (mainCountry, favoriteCountries) => {
	const fromCurrency = mainCountry?.currency.split(',')[0]
	const toCurrencies = favoriteCountries
		.map(favorite => favorite.currency)
		.join(',')

	if (fromCurrency && toCurrencies) {
		try {
			const res = await performGetRequest(`${CURRENCY_BASE_URL}?from=${fromCurrency}&to=${toCurrencies}`)
			return res?.rates
		} catch (err) {
			console.error(err)
			return { error: err }
		}
	}
}

export { fetchCurrencies }

const genID = () => Math.floor(1000000 * Math.random()) + 1000000

const MAX_FAVORITE_COUNTRIES = 5

const CountryFactory = ({ name= '', code= '', currency= '', emoji= '', capital= '' }) => ({
	id: genID(),
	name,
	code,
	capital,
	emoji,
	currency
})

const getCountry = (countryName, allCountries) => {
	const country = allCountries.find(country => countryName.indexOf(country.emoji) >= 0)
	return country || {}
}

const composeCountryString = country => country.currency && `${country.emoji}   ${country.name}`

const rateString = (rates, currency) => {
	return `${rates[currency].toFixed(2)} ${currency}`
}

const getFirstCurrency = country => {
	const { currency } = country
	return currency?.split(',')?.[0]
}

const composeRateString = (mainCountry, favoriteCountry, rates) => {
	const mainCurrency = getFirstCurrency(mainCountry)
	const favoriteCurrency = getFirstCurrency(favoriteCountry)

	if (mainCurrency === favoriteCurrency) {
		return `1 ${mainCurrency}`
	}
	if (favoriteCurrency) {
		if (rates[favoriteCurrency]) {
			return rateString(rates, favoriteCurrency)
		}
		return 'N/A'
	}
	return ''
}

export { MAX_FAVORITE_COUNTRIES }
export { CountryFactory }
export { getCountry }
export { composeCountryString }
export { composeRateString }

import { composeCountryString, composeRateString, getFirstCurrency, getCountry } from './helpers';

let mainCountry = {
	name: "Italy",
	code: "IT",
	capital: "Rome",
	emoji: "🇮🇹",
	currency: "EUR",
}

let favoriteCountries = [
	{
		name: "United Arab Emirates",
		code: "AE",
		capital: "Abu Dhabi",
		emoji: "🇦🇪",
		currency: "AED",
	},
	{
		name: "United States",
		emoji: "🇺🇸",
		currency: "USD,USN,USS"
	},
	{
		name: "Ireland",
		code: "IE",
		capital: "Dublin",
		emoji: "🇮🇪",
		currency: "EUR",
	},
	{
		name: "Brazil",
		code: "BR",
		capital: "Brasília",
		emoji: "🇧🇷",
		currency: "BRL",
	}
]

let allCountries = [
	{
		"name": "Andorra",
		"code": "AD",
		"capital": "Andorra la Vella",
		"emoji": "🇦🇩",
		"currency": "EUR",
	},
	{
		"name": "United Arab Emirates",
		"code": "AE",
		"capital": "Abu Dhabi",
		"emoji": "🇦🇪",
		"currency": "AED",
	},
	{
		"name": "Brazil",
		"code": "BR",
		"capital": "Brasília",
		"emoji": "🇧🇷",
		"currency": "BRL",
	},
	{
		"name": "United States",
		"code": "US",
		"capital": "Washington D.C.",
		"emoji": "🇺🇸",
		"currency": "USD,USN,USS",
	}
]

let rates = {
	USD: 0.16,
}

test('render not available currency abbreviation', () => {
	const rateString = composeRateString(mainCountry, favoriteCountries[0], rates)
	expect(rateString).toBe('N/A');
});

test('render currency correctly', () => {
	const rateString = composeRateString(mainCountry, favoriteCountries[1], rates)
	expect(rateString).toBe('0.16 USD');
});

test('return same currency from main country', () => {
	const rateString = composeRateString(mainCountry, favoriteCountries[2], rates)
	expect(rateString).toBe('1 EUR');
});

test('return first currency from country', () => {
	const firstCurrency = getFirstCurrency(favoriteCountries[1])
	expect(firstCurrency).toBe('USD');
});

test('return the correct country', () => {
	const country = getCountry('🇦🇪   United Arab Emirates', allCountries)
	expect(country).toStrictEqual(favoriteCountries[0]);
});

test('render country string correctly', () => {
	const countryString = composeCountryString(mainCountry)
	expect(countryString).toBe('🇮🇹   Italy');
});


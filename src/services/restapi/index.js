const performGetRequest = async (url = '') => {
	const response = await fetch(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	})

	return response.json()
}

export * from './currency'
export { performGetRequest }

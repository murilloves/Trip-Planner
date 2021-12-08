import { useState } from "react";

const useLocalStorage = (key, defaultValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : defaultValue;
		} catch (error) {
			console.error(error);
			return defaultValue;
		}
	});

	const setValue = (value) => {
		try {
			const valueToBeStored = value instanceof Function
				? value(storedValue)
				: value;
			setStoredValue(valueToBeStored);
			window.localStorage.setItem(key, JSON.stringify(valueToBeStored));
		} catch (error) {
			console.error(error);
		}
	};
	return [storedValue, setValue];
}

export { useLocalStorage }
export const setSessionStorage = <T>(key: string, value: T): void => {
	if (typeof window === 'undefined') return;

	try {
		sessionStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error(`Error setting sessionStorage key "${key}":`, error);
	}
};

export const getSessionStorage = <T>(key: string): T | null => {
	if (typeof window === 'undefined') return null;

	try {
		const item = sessionStorage.getItem(key);
		return item ? (JSON.parse(item) as T) : null;
	} catch (error) {
		console.error(`Error getting sessionStorage key "${key}":`, error);
		return null;
	}
};

export const removeSessionStorage = (key: string): void => {
	if (typeof window === 'undefined') return;

	try {
		sessionStorage.removeItem(key);
	} catch (error) {
		console.error(`Error removing sessionStorage key "${key}":`, error);
	}
};

export const clearSessionStorage = (): void => {
	if (typeof window === 'undefined') return;

	try {
		sessionStorage.clear();
	} catch (error) {
		console.error('Error clearing sessionStorage:', error);
	}
};

export const SessionStorage = () => {
	return {
		set: setSessionStorage,
		get: getSessionStorage,
		remove: removeSessionStorage,
		clear: clearSessionStorage,
	};
};

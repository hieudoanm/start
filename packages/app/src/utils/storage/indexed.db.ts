interface IDBOptions {
	dbName: string;
	storeName: string;
	version?: number;
}

const openDB = ({
	dbName,
	storeName,
	version = 1,
}: IDBOptions): Promise<IDBDatabase> => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName, version);

		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName);
			}
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => {
			const err = request.error;
			reject(err instanceof Error ? err : new Error(String(err)));
		};
	});
};

export const setItem = async <T>(
	key: string,
	value: T,
	options: IDBOptions,
): Promise<void> => {
	const db = await openDB(options);
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(options.storeName, 'readwrite');
		const store = transaction.objectStore(options.storeName);
		const request = store.put(value, key);

		request.onsuccess = () => resolve();
		request.onerror = () => {
			const err = request.error;
			reject(err instanceof Error ? err : new Error(String(err)));
		};
	});
};

export const getItem = async <T>(
	key: string,
	options: IDBOptions,
): Promise<T | null> => {
	const db = await openDB(options);
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(options.storeName, 'readonly');
		const store = transaction.objectStore(options.storeName);
		const request = store.get(key);

		request.onsuccess = () => resolve(request.result ?? null);
		request.onerror = () => {
			const err = request.error;
			reject(err instanceof Error ? err : new Error(String(err)));
		};
	});
};

export const deleteItem = async (
	key: string,
	options: IDBOptions,
): Promise<void> => {
	const db = await openDB(options);
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(options.storeName, 'readwrite');
		const store = transaction.objectStore(options.storeName);
		const request = store.delete(key);

		request.onsuccess = () => resolve();
		request.onerror = () => {
			const err = request.error;
			reject(err instanceof Error ? err : new Error(String(err)));
		};
	});
};

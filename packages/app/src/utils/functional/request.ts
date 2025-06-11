type FetchOptions = RequestInit & {
	timeout?: number; // Optional timeout in milliseconds
};

export const request = async <T = unknown>(
	url: string,
	options: FetchOptions = {},
): Promise<T> => {
	const { timeout = 8000, ...fetchOptions } = options;
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(url, {
			...fetchOptions,
			signal: controller.signal,
			headers: {
				'Content-Type': 'application/json',
				...(fetchOptions.headers || {}),
			},
		});

		clearTimeout(timer);

		if (!response.ok) {
			const errorBody = await response.text();
			throw new Error(
				`HTTP ${response.status} - ${response.statusText}\n${errorBody}`,
			);
		}

		const contentType = response.headers.get('content-type');
		if (contentType?.includes('application/json')) {
			return (await response.json()) as T;
		} else {
			return (await response.text()) as unknown as T;
		}
	} catch (error) {
		clearTimeout(timer);

		if (error instanceof DOMException && error.name === 'AbortError') {
			throw new Error('Request timed out');
		} else if (error instanceof TypeError) {
			throw new Error(`Network error or invalid URL: ${error.message}`);
		} else {
			throw error;
		}
	}
};

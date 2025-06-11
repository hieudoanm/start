export const groupBy = <T, K extends keyof T>(
	array: T[],
	key: K,
): Record<string, T[]> => {
	return array.reduce((acc: Record<string, T[]>, item: T) => {
		const groupKey = String(item[key]);
		if (!acc[groupKey]) {
			acc[groupKey] = [];
		}
		acc[groupKey].push(item);
		return acc;
	}, {});
};

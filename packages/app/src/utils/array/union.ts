export const union = <T>(...arrays: T[][]): T[] => {
  const set = new Set<T>();
  for (const array of arrays) {
    array.forEach((item) => set.add(item));
  }
  return Array.from(set);
};

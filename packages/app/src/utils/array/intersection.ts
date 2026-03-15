export const intersection = <T>(a: T[], b: T[]): T[] => {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item));
};

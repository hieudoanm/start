export const commas = (number: number | bigint) => {
  if (typeof number !== 'number' && typeof number !== 'bigint') return '';
  return number.toLocaleString('en-US');
};

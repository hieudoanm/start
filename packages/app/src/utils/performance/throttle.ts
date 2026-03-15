/* eslint-disable @typescript-eslint/no-explicit-any */

export const throttle = <T extends (...args: any[]) => void>(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
};

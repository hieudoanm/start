/* eslint-disable @typescript-eslint/no-explicit-any */

export const rateLimit = <T extends (...args: any[]) => any>(
  fn: T,
  limitMs: number
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  let lastCallTime = 0;

  return async function (...args: Parameters<T>): Promise<ReturnType<T>> {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    if (timeSinceLastCall < limitMs) {
      await new Promise((res) => setTimeout(res, limitMs - timeSinceLastCall));
    }

    lastCallTime = Date.now();
    return fn(...args);
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */

// Run a function only once, then always return the cached result
export const once = <T extends (...args: any[]) => any>(fn: T): T => {
  let called = false;
  let result: ReturnType<T>;
  return ((...args: Parameters<T>): ReturnType<T> => {
    if (!called) {
      result = fn(...args);
      called = true;
    }
    return result;
  }) as T;
};

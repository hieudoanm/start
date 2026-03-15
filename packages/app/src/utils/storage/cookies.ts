// Set a cookie
export const setCookie = (name: string, value: string, days?: number): void => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
};

// Get a cookie by name
export const getCookie = (name: string): string | null => {
  const regex = new RegExp('(^| )' + name + '=([^;]+)');
  const result = regex.exec(document.cookie);
  return result ? decodeURIComponent(result[2]) : null;
};

// Delete a cookie by name
export const deleteCookie = (name: string): void => {
  setCookie(name, '', -1);
};

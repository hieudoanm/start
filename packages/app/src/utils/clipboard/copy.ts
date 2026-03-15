export const copy = (text: string): void => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert('Copied to clipboard!');
    })
    .catch((error) => {
      console.error('Failed to copy: ', error);
    });
};

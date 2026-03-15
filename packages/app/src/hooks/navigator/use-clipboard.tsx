import { useCallback, useState } from 'react';

type ClipboardState = {
  copiedText: string;
  error: string | null;
  isSupported: boolean;
  copy: (text: string) => Promise<boolean>;
  read: () => Promise<string>;
};

export const useClipboard = (): ClipboardState => {
  const [copiedText, setCopiedText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isSupported = !!navigator?.clipboard;

  const copy = useCallback(
    async (text: string) => {
      if (!isSupported) {
        setError('Clipboard API not supported');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        setError(null);
        return true;
      } catch (error) {
        setError((error as Error).message);
        return false;
      }
    },
    [isSupported]
  );

  const read = useCallback(async () => {
    if (!isSupported) {
      setError('Clipboard API not supported');
      return '';
    }

    try {
      const text = await navigator.clipboard.readText();
      setCopiedText(text);
      setError(null);
      return text;
    } catch (error) {
      setError((error as Error).message);
      return '';
    }
  }, [isSupported]);

  return {
    copiedText,
    error,
    isSupported,
    copy,
    read,
  };
};

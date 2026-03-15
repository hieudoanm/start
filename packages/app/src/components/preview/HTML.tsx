import { FC, useEffect, useState } from 'react';
import createDOMPurify from 'dompurify';

export const HTMLPreview: FC<{ code: string }> = ({ code = '' }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const DOMPurify = createDOMPurify(window);
    setHtml(DOMPurify.sanitize(code));
  }, [code]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

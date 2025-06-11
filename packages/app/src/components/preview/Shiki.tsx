import { FC, useEffect, useState } from 'react';
import { BundledLanguage, codeToHtml } from 'shiki';

export const Shiki: FC<{
	code: string;
	lang: BundledLanguage;
}> = ({ code, lang }) => {
	const [html, setHtml] = useState<string>('');
	useEffect(() => {
		const codeToHtmlAsync = async () => {
			const html: string = await codeToHtml(code, {
				lang,
				theme: 'github-dark',
			});
			setHtml(html);
		};
		codeToHtmlAsync();
	});

	return (
		<div
			className="w-full cursor-pointer overflow-x-auto bg-neutral-900 p-4 text-left"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
};

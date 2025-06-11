import { copy } from '@start/utils/clipboard/copy';
import createDOMPurify from 'dompurify';
import { FC, useEffect, useState } from 'react';
import { Shiki } from './Shiki';

export const Code: FC<{
	id: string;
	emoji: string;
	group: string;
	name: string;
	code: string;
	codeOnly?: boolean;
}> = ({
	id = '',
	emoji = '',
	group = '',
	name = '',
	code = '',
	codeOnly = false,
}) => {
	const [html, setHtml] = useState('');
	const [preview, setPreview] = useState<boolean>(true);

	useEffect(() => {
		const DOMPurify = createDOMPurify(window);
		setHtml(DOMPurify.sanitize(code));
	}, [code]);

	return (
		<div id={id} className="flex flex-col gap-y-4 md:gap-y-8">
			<div className="flex items-center justify-between gap-x-2">
				<div className="flex items-center gap-x-2">
					<span className="text-4xl">{emoji}</span>
					<div>
						<p className="text-xs capitalize">{group}</p>
						<h3 className="text-xl font-bold md:text-2xl">{name}</h3>
					</div>
				</div>
				<div className="flex items-center gap-x-2">
					{codeOnly && (
						<button
							type="button"
							className="cursor-pointer rounded-md border border-purple-600 bg-purple-600 px-4 py-2 text-white shadow transition duration-200 hover:bg-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-700 dark:shadow-neutral-100/10 dark:hover:bg-purple-600"
							onClick={() => copy(code)}>
							Copy
						</button>
					)}
					{!codeOnly && (
						<button
							type="button"
							className="cursor-pointer rounded-md border border-purple-600 bg-purple-600 px-4 py-2 text-white shadow transition duration-200 hover:bg-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-700 dark:shadow-neutral-100/10 dark:hover:bg-purple-600"
							onClick={() => setPreview((previous: boolean) => !previous)}>
							{preview ? 'Preview' : 'Code'}
						</button>
					)}
				</div>
			</div>
			<div className="flex items-center justify-center overflow-hidden rounded-lg border border-neutral-200 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
				{codeOnly ? (
					<Shiki code={code} lang="tsx" />
				) : (
					<>
						{preview ? (
							<div
								className="w-full p-4 md:p-8"
								dangerouslySetInnerHTML={{ __html: html }}
							/>
						) : (
							<Shiki code={code} lang="html" />
						)}
					</>
				)}
			</div>
		</div>
	);
};

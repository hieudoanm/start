import { copy } from '@start/utils/clipboard/copy';
import createDOMPurify from 'dompurify';
import { FC, useEffect, useState } from 'react';

export const Icon: FC<{ name: string; code: string }> = ({
	name = '',
	code = '',
}) => {
	const [html, setHtml] = useState('');

	useEffect(() => {
		const DOMPurify = createDOMPurify(window);
		setHtml(DOMPurify.sanitize(code));
	}, [code]);

	return (
		<button
			type="button"
			title={name}
			className="cursor-pointer"
			onClick={() => {
				copy(code);
			}}>
			<div className="flex items-center justify-center overflow-hidden rounded-lg border border-neutral-200 p-2 shadow md:p-4 lg:p-8 dark:border-neutral-800 dark:shadow-neutral-100/10">
				<div
					className="h-fit w-fit [&>svg]:h-8 [&>svg]:fill-current [&>svg]:text-neutral-900 dark:[&>svg]:text-neutral-100"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</div>
		</button>
	);
};

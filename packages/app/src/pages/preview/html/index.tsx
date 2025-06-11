import { PageTemplate } from '@start/templates/PageTemplate';
import { NextPage } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';
import createDOMPurify from 'dompurify';

const PreviewHtmlPage: NextPage = () => {
	const [{ code, html }, setState] = useState<{ code: string; html: string }>({
		code: '',
		html: '',
	});

	useEffect(() => {
		const DOMPurify = createDOMPurify(window);
		setState((previous) => ({ ...previous, html: DOMPurify.sanitize(code) }));
	}, [code]);

	return (
		<PageTemplate
			query=""
			setState={() => {}}
			id="preview-html"
			emoji="🧪"
			title="atomic/preview"
			description="Live preview of atomic design components rendered as HTML">
			<section className="py-8 md:py-16">
				<div className="container mx-auto px-8">
					<div className="grid grid-cols-1 divide-x divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow md:grid-cols-2 dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-neutral-100/10">
						<div className="col-span-1">
							<textarea
								rows={10}
								id="code"
								placeholder="HTML Code"
								className="w-full p-2 focus:outline-none md:p-4"
								value={code}
								onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
									const newCode: string = event.target.value;
									const DOMPurify = createDOMPurify(window);
									const newHTML: string = DOMPurify.sanitize(code);
									setState((previous) => ({
										...previous,
										code: newCode,
										html: newHTML,
									}));
								}}></textarea>
						</div>
						<div className="col-span-1">
							<div
								className="h-full w-full p-2 md:p-4"
								dangerouslySetInnerHTML={{ __html: html }}></div>
						</div>
					</div>
				</div>
			</section>
		</PageTemplate>
	);
};

export default PreviewHtmlPage;

import { Code } from '@start/components/preview/Code';
import { PageTemplate } from '@start/templates/PageTemplate';
import { NextPage } from 'next';
import Link from 'next/link';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { useState } from 'react';

type Component = {
	id: string;
	group: string;
	emoji: string;
	name: string;
	code: string;
};

const UIBlockPage: NextPage<{ blocks: Component[] }> = ({ blocks = [] }) => {
	const [{ query = '' }, setState] = useState<{ query: string }>({ query: '' });

	const filteredComponents = blocks.filter(({ id, name }) => {
		return (
			id.toLowerCase().includes(query.toLowerCase()) ||
			name.toLowerCase().includes(query.toLowerCase())
		);
	});

	return (
		<PageTemplate
			query={query}
			setState={setState}
			id="ui-blocks"
			emoji="🎨"
			title="atomic/blocks"
			description="is a free set of Tailwind CSS Blocks built following atomic design principles for consistent UI development.">
			<section className="py-8 md:py-16">
				<div className="container mx-auto px-8">
					<div className="flex flex-col gap-y-4 md:gap-y-8">
						<h2 className="text-2xl font-bold">
							<span className="capitalize">Components</span> (
							{filteredComponents.length})
						</h2>
						{filteredComponents.length > 0 && (
							<>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
									{filteredComponents.map(
										({ id = '', emoji = '', group, name = '' }) => {
											return (
												<Link href={`#${id}`} key={id}>
													<div className="col-span-1">
														<div className="flex items-center gap-x-2 rounded-lg border border-neutral-200 bg-white/40 p-4 shadow dark:border-neutral-800 dark:bg-neutral-900/40 dark:shadow-neutral-100/10">
															<p className="text-2xl">{emoji}</p>
															<div className="flex flex-col gap-y-0.25">
																<p className="text-xs capitalize">{group}</p>
																<p className="text-sm font-semibold capitalize">
																	{name}
																</p>
															</div>
														</div>
													</div>
												</Link>
											);
										},
									)}
								</div>
								<div className="flex flex-col gap-y-4 md:gap-y-8">
									{filteredComponents.map(
										({
											id = '',
											emoji = '',
											group = '',
											name = '',
											code = '',
										}) => {
											return (
												<div key={id} className="flex flex-col gap-y-4">
													<Code
														id={id}
														emoji={emoji}
														group={group}
														name={name}
														code={code}
													/>
												</div>
											);
										},
									)}
								</div>
							</>
						)}
					</div>
				</div>
			</section>
		</PageTemplate>
	);
};

export const getStaticProps = () => {
	const blocks = [
		{ path: 'auth/password-forget', emoji: '🧠', name: 'Forget Password' },
		{ path: 'auth/password-reset', emoji: '🔁', name: 'Reset Password' },
		{ path: 'auth/sign-in', emoji: '🔓', name: 'Sign In' },
		{ path: 'auth/sign-up', emoji: '📝', name: 'Sign Up' },
		{ path: 'marketing/cta/linear', emoji: '🚀', name: 'CTA (Linear)' },
		{ path: 'marketing/cta/solid', emoji: '🚀', name: 'CTA (Solid)' },
		{ path: 'marketing/features', emoji: '✨', name: 'Features' },
		{ path: 'marketing/footer', emoji: '🦶', name: 'Footer' },
		{ path: 'marketing/headline', emoji: '📢', name: 'Headline' },
		{ path: 'marketing/hero/linear', emoji: '🦸', name: 'Hero (Linear)' },
		{ path: 'marketing/hero/solid', emoji: '🦸', name: 'Hero (Solid)' },
		{ path: 'marketing/pricing', emoji: '💰', name: 'Pricing' },
		{
			path: 'marketing/testimonials/linear',
			emoji: '💬',
			name: 'Testimonials (Linear)',
		},
		{
			path: 'marketing/testimonials/solid',
			emoji: '💬',
			name: 'Testimonials (Solid)',
		},
		{ path: 'mockup/browser', emoji: '🌐', name: 'Browser' },
		{ path: 'mockup/phone', emoji: '📱', name: 'Phone' },
		{ path: 'mockup/terminal', emoji: '🖥️', name: 'Terminal' },
		{ path: 'mockup/window', emoji: '🪟', name: 'Window' },
		{ path: 'navigation/breadcrumbs', emoji: '🍞', name: 'Breadcrumbs' },
		{ path: 'navigation/menu', emoji: '📁', name: 'Menu' },
		{ path: 'navigation/navbar', emoji: '🧭', name: 'Navbar' },
		{ path: 'navigation/pagination', emoji: '📄', name: 'Pagination' },
		{ path: 'navigation/steps', emoji: '🪜', name: 'Steps' },
		{ path: 'navigation/tabs', emoji: '📑', name: 'Tabs' },
	].map(({ path = '', emoji = '', name = '' }) => {
		const DEV_PATH = '../../../..';
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = join(dirname(__filename), DEV_PATH);

		const group = path.split('/').at(0);
		const id = path.replaceAll('/', '-');
		const componentPath = `${__dirname}/src/html/block/${path}.html`;
		const code = readFileSync(componentPath, 'utf-8');
		return { id, group, name, emoji, code };
	});

	return { props: { blocks } };
};

export default UIBlockPage;

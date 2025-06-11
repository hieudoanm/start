import { Code } from '@start/components/preview/Code';
import { PageTemplate } from '@start/templates/PageTemplate';
import { NextPage } from 'next';
import Link from 'next/link';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { useState } from 'react';

type Context = {
	id: string;
	group: string;
	emoji: string;
	name: string;
	code: string;
};

const ContextsPage: NextPage<{ contexts: Context[] }> = ({ contexts = [] }) => {
	const [{ query = '' }, setState] = useState<{ query: string }>({ query: '' });

	const filteredContexts = contexts.filter(({ id, name }) => {
		return (
			id.toLowerCase().includes(query.toLowerCase()) ||
			name.toLowerCase().includes(query.toLowerCase())
		);
	});

	return (
		<PageTemplate
			query={query}
			setState={setState}
			id="react-contexts"
			emoji="🔗"
			title="atomic/contexts"
			description="are essential React context providers focused on simplicity, reusability, and scalability for better state management.">
			<section className="py-8 md:py-16">
				<div className="container mx-auto px-8">
					<div className="flex flex-col gap-y-4 md:gap-y-8">
						<h2 className="text-2xl font-bold">
							<span className="capitalize">Contexts</span> (
							{filteredContexts.length})
						</h2>
						{filteredContexts.length > 0 && (
							<>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
									{filteredContexts.map(
										({ id = '', emoji = '', group, name = '' }) => {
											return (
												<Link href={`#${id}`} key={id}>
													<div className="col-span-1">
														<div className="flex items-center gap-x-2 rounded-lg border border-neutral-200 bg-white/40 p-4 shadow dark:border-neutral-800 dark:bg-neutral-900/40 dark:shadow-neutral-100/10">
															<p className="text-2xl">{emoji}</p>
															<div className="flex flex-col gap-y-0.25">
																<p className="text-xs capitalize">{group}</p>
																<p className="font-semibold capitalize">
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
								<div className="flex flex-col gap-y-8">
									{filteredContexts.map(
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
														codeOnly
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
	const contexts = [
		{ path: 'LanguageContext', emoji: '🌐', name: 'LanguageContext' },
		{ path: 'ModalContext', emoji: '🪟', name: 'ModalContext' },
		{ path: 'NotificationContext', emoji: '🔔', name: 'NotificationContext' },
		{ path: 'SettingsContext', emoji: '⚙️', name: 'SettingsContext' },
		{ path: 'ThemeContext', emoji: '🎨', name: 'ThemeContext' },
		{ path: 'UserContext', emoji: '👤', name: 'UserContext' },
	].map(({ path = '', emoji = '', name = '' }) => {
		const DEV_PATH = '../../../..';
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = join(dirname(__filename), DEV_PATH);

		const group = 'context';
		const contextPath = `${__dirname}/src/contexts/${path}.tsx`;
		const code = readFileSync(contextPath, 'utf-8');
		return { id: path, group, name, emoji, code };
	});
	return { props: { contexts } };
};

export default ContextsPage;

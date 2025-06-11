import { Code } from '@start/components/preview/Code';
import { PageTemplate } from '@start/templates/PageTemplate';
import { NextPage } from 'next';
import Link from 'next/link';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { useState } from 'react';

console.log(typeof fileURLToPath);

type Hook = {
	id: string;
	group: string;
	emoji: string;
	name: string;
	code: string;
};

const HooksPage: NextPage<{ hooks: Hook[] }> = ({ hooks = [] }) => {
	const [{ query = '' }, setState] = useState<{ query: string }>({ query: '' });

	const filteredHooks = hooks.filter(({ id, name }) => {
		return (
			id.toLowerCase().includes(query.toLowerCase()) ||
			name.toLowerCase().includes(query.toLowerCase())
		);
	});

	return (
		<PageTemplate
			query={query}
			setState={setState}
			id="react-hooks"
			emoji="🪝"
			title="atomic/hooks"
			description="is a collection of reusable React hooks built for simplicity, efficiency, and ease of integration.">
			<section className="py-8 md:py-16">
				<div className="container mx-auto px-8">
					<div className="flex flex-col gap-y-4 md:gap-y-8">
						<h2 className="text-2xl font-bold">
							<span className="capitalize">Hooks</span> ({filteredHooks.length})
						</h2>
						{filteredHooks.length > 0 && (
							<>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
									{filteredHooks.map(
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
									{filteredHooks.map(
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
	const hooks = [
		{ path: 'boolean/use-boolean', emoji: '🔘', name: 'useBoolean' },
		{ path: 'boolean/use-toggle', emoji: '🔀', name: 'useToggle' },
		{ path: 'events/use-keyboard', emoji: '⌨️', name: 'useKeyboard' },
		{ path: 'events/use-media-query', emoji: '🖼️', name: 'useMediaQuery' },
		{ path: 'events/use-resize', emoji: '📏', name: 'useResize' },
		{ path: 'events/use-scroll', emoji: '🖱️', name: 'useScroll' },
		{ path: 'info/use-battery', emoji: '🔋', name: 'useBattery' },
		{ path: 'info/use-browser', emoji: '🌐', name: 'useBrowser' },
		{ path: 'info/use-language', emoji: '🈯', name: 'useLanguage' },
		{ path: 'info/use-screen', emoji: '🖥️', name: 'useScreen' },
		{ path: 'navigator/use-bluetooth', emoji: '📶', name: 'useBluetooth' },
		{ path: 'navigator/use-camera', emoji: '📷', name: 'useCamera' },
		{ path: 'navigator/use-clipboard', emoji: '📋', name: 'useClipboard' },
		{ path: 'navigator/use-geolocation', emoji: '📍', name: 'useGeolocation' },
		{ path: 'network/use-online', emoji: '📶', name: 'useOnline' },
		{ path: 'network/use-fetch', emoji: '🛰️', name: 'useFetch' },
		{
			path: 'ssr/use-isomorphic-layout-effect',
			emoji: '⚙️',
			name: 'useIsomorphicLayoutEffect',
		},
		{ path: 'storage/use-local-storage', emoji: '💾', name: 'useLocalStorage' },
		{
			path: 'storage/use-session-storage',
			emoji: '🗂️',
			name: 'useSessionStorage',
		},
		{ path: 'time/use-countdown', emoji: '⏳', name: 'useCountdown' },
		{ path: 'time/use-interval', emoji: '⏱️', name: 'useInterval' },
		{ path: 'time/use-timeout', emoji: '⏳', name: 'useTimeout' },
	].map(({ path = '', emoji = '', name = '' }) => {
		const DEV_PATH = '../../../..';
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = join(dirname(__filename), DEV_PATH);
		const group = path.split('/').at(0);
		const id = path.replaceAll('/', '-');
		const hookPath = `${__dirname}/src/hooks/${path}.tsx`;
		const code = readFileSync(hookPath, 'utf-8');
		return { id, group, name, emoji, code };
	});
	return { props: { hooks } };
};

export default HooksPage;

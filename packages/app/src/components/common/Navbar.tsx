import { useDarkMode } from '@start/hooks/use-dark-mode';
import { unique } from '@start/utils/array/unique';
import Link from 'next/link';
import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Toggle } from './Toggle';

type NavbarLink = {
	group: Group;
	id: string;
	emoji: string;
	href: string;
	text: string;
};

export type Group = 'assets' | 'react' | 'ui' | 'tools';

const groupEmojis: Record<Group, string> = {
	assets: '🖼️',
	react: '⚛️',
	ui: '🎨',
	tools: '🛠️',
};

const MobileNavbar: FC<{ links: NavbarLink[] }> = ({ links }) => {
	return (
		<div className="inline-block md:hidden">
			<div className="group relative inline-block text-left">
				<button
					type="button"
					className="inline-flex items-center justify-center gap-1 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
						className="w-4"
						fill="currentColor">
						<path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
					</svg>
				</button>
				<div className="invisible absolute left-0 z-50 mt-2 w-48 origin-top-right scale-95 transform rounded-md border border-neutral-200 bg-white p-1 text-sm opacity-0 shadow-lg transition-all group-hover:visible group-hover:scale-100 group-hover:opacity-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
					{links.map(({ id = '', href = '', emoji = '', text = '' }) => {
						return (
							<Link
								key={id}
								href={href}
								className="block rounded px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
								{emoji} {text}
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

const DesktopNavbar: FC<{ links: NavbarLink[] }> = ({ links = [] }) => {
	const groups: Group[] = unique(links.map(({ group }) => group));
	const linksByGroups = groups.map((group) => {
		return {
			group,
			links: links.filter(({ group: linkGroup }) => group === linkGroup),
		};
	});

	return (
		<div className="hidden items-center gap-x-2 md:flex md:gap-x-4">
			{linksByGroups.map(({ group, links = [] }) => {
				return (
					<div key={group} className="group relative inline-block text-left">
						<button type="button" className="truncate text-sm md:text-base">
							{groupEmojis[group] ?? ''}{' '}
							<span className="hidden lg:inline">
								{group} ({links.length})
							</span>
						</button>
						<div className="invisible absolute right-0 z-50 mt-2 w-48 origin-top-right scale-95 transform rounded-md border border-neutral-200 bg-white p-1 text-sm opacity-0 shadow-lg transition-all group-hover:visible group-hover:scale-100 group-hover:opacity-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
							{links.map(({ id = '', href = '', emoji = '', text = '' }) => {
								return (
									<Link
										key={id}
										href={href}
										className="block rounded px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
										{emoji} {text}
									</Link>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export const Navbar: FC<{
	emoji: string;
	title: string;
	links: NavbarLink[];
	disabledSearch?: boolean;
	query: string;
	setState: Dispatch<SetStateAction<{ query: string }>>;
}> = ({
	emoji = '',
	title = '',
	links = [],
	query = '',
	setState,
	disabledSearch = false,
}) => {
	const { darkMode = false, toggleDarkMode } = useDarkMode();

	return (
		<nav className="border-b border-neutral-200 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
			<div className="container mx-auto flex flex-col gap-y-2 px-8 py-4">
				<div className="flex items-center justify-between gap-x-4">
					<MobileNavbar links={links} />
					<div className="flex items-center gap-x-4">
						<Link href="/" className="truncate text-lg font-bold md:text-xl">
							{emoji}{' '}
							<span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent dark:from-red-700 dark:via-purple-700 dark:to-blue-700">
								{title}
							</span>
						</Link>
					</div>
					<div className="flex items-center gap-x-2 md:gap-x-4">
						<DesktopNavbar links={links} />
						<Toggle checked={darkMode} onChange={() => toggleDarkMode()} />
					</div>
				</div>
				{!disabledSearch && (
					<input
						type="text"
						placeholder="Search"
						value={query}
						className="w-full rounded-lg border border-neutral-200 px-4 py-2 shadow focus:outline-none dark:border-neutral-800 dark:shadow-neutral-100/10"
						onChange={(event: ChangeEvent<HTMLInputElement>): void => {
							setState((previous) => ({
								...previous,
								query: event.target.value,
							}));
						}}
					/>
				)}
			</div>
		</nav>
	);
};

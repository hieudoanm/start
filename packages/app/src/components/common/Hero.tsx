import Link from 'next/link';
import { FC } from 'react';

type HeroProps = { emoji: string; title: string; description: string };

export const Hero: FC<HeroProps> = ({
	emoji = '',
	title = '',
	description = '',
}) => {
	return (
		<section className="py-8 md:py-16">
			<div className="container mx-auto px-8">
				<div className="flex flex-col items-center justify-center gap-y-4 md:gap-y-8">
					<h1 className="text-4xl font-black whitespace-nowrap md:text-5xl">
						{emoji}{' '}
						<span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent dark:from-red-700 dark:via-purple-700 dark:to-blue-700">
							{title}
						</span>
					</h1>
					<div className="flex w-full max-w-xl flex-col gap-y-4 text-center md:gap-y-8">
						<p className="text-neutral-900 dark:text-neutral-100">
							{description}
						</p>
					</div>
					<Link href="https://github.com/hieudoanm/atomic" target="_blank">
						<button className="cursor-pointer rounded-lg bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 px-5 py-3 font-semibold text-neutral-100 dark:border-neutral-800 dark:from-red-700 dark:via-purple-700 dark:to-blue-700">
							⭐ GitHub
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
};

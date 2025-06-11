import { RadialGradientBackground } from '@start/components/common/RadialGradientBackground';
import { useDarkMode } from '@start/hooks/use-dark-mode';
import Link from 'next/link';
import { FC } from 'react';

export const ErrorTemplate: FC<{
	code: string;
	title: string;
	message: string;
	action: string;
}> = ({ code = '', title = '', message = '', action = '' }) => {
	const { darkMode } = useDarkMode();
	console.info('darkMode', darkMode);

	return (
		<>
			<RadialGradientBackground />
			<div className="flex min-h-screen items-center justify-center px-4 text-neutral-900 dark:text-neutral-100">
				<div className="flex flex-col gap-y-4 text-center">
					<h1 className="text-9xl font-extrabold">{code}</h1>
					<div className="flex flex-col gap-y-2">
						<p className="text-2xl font-semibold">{title}</p>
						<p>{message}</p>
						<Link href="/">
							<button className="cursor-pointer rounded-lg bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 px-5 py-3 font-semibold text-neutral-100 dark:border-neutral-800 dark:from-red-700 dark:via-purple-700 dark:to-blue-700">
								🏠 {action}
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

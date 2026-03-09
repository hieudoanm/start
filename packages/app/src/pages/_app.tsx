import { UserProvider } from '@start/contexts/UserContext';
import '@start/styles/globals.css';
import { HeadTemplate } from '@start/templates/HeadTemplate';
import { trpcHook } from '@start/utils/trpc';
import type { AppProps } from 'next/app';
import { Geist, Geist_Mono } from 'next/font/google';
import { FC } from 'react';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<HeadTemplate title="Start" />
			<div className={`${geistSans.className} ${geistMono.className}`}>
				<UserProvider>
					<Component {...pageProps} />
				</UserProvider>
			</div>
		</>
	);
};

export default trpcHook.withTRPC(App);

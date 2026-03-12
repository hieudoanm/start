import { Navbar } from '@start/components/auth/Navbar';
import { Footer } from '@start/components/common/Footer/Footer';
import { RadialGradientBackground } from '@start/components/common/RadialGradientBackground';
import { Linear } from '@start/components/common/Typography';
import { APP_NAME } from '@start/constants/constants';
import { FC, ReactNode } from 'react';

export const AuthTemplate: FC<{ children: ReactNode }> = ({
	children = <></>,
}) => {
	return (
		<div className="flex h-screen w-screen flex-col">
			<RadialGradientBackground />
			<Navbar />
			<div className="grow">
				<div className="flex h-full w-full w-screen items-center justify-center p-4 md:p-8">
					<div className="w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-900/80 p-8 shadow shadow-neutral-100/10">
						<div className="flex flex-col gap-y-8">
							<h1 className="text-center text-3xl font-black md:text-4xl">
								<Linear>{APP_NAME}</Linear>
							</h1>
							{children}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

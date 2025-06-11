import { FC, ReactNode } from 'react';

export const NavbarContainer: FC<{ children: ReactNode }> = ({
	children = <></>,
}) => {
	return (
		<nav className="border-b border-neutral-800 shadow shadow-neutral-100/10">
			<div className="container mx-auto px-4 py-2 md:px-8 md:py-4">
				<div className="flex items-center justify-between gap-x-4">
					{children}
				</div>
			</div>
		</nav>
	);
};

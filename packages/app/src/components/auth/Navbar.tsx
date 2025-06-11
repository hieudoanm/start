import Link from 'next/link';
import { FC } from 'react';
import { NavbarContainer } from '../common/NavbarContainer';
import { Linear } from '../common/Typography';

export const Navbar: FC = () => {
	return (
		<NavbarContainer>
			<Link href="/" className="text-xl font-black">
				<Linear>Start</Linear>
			</Link>
		</NavbarContainer>
	);
};

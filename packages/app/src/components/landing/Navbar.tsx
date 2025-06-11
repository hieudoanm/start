import { Button, OutlineButton } from '@start/components/common/Button';
import { APP_NAME } from '@start/constants/constants';
import { useUser } from '@start/contexts/UserContext';
import Link from 'next/link';
import { FC } from 'react';
import { NavbarContainer } from '../common/NavbarContainer';
import { Linear } from '../common/Typography';

export const Navbar: FC = () => {
	const { isAuthenticated = false, user, signOut } = useUser();

	return (
		<NavbarContainer>
			<Link href="/" className="text-xl font-black whitespace-nowrap">
				<Linear>{APP_NAME}</Linear>
			</Link>
			{isAuthenticated && (
				<div className="flex items-center gap-x-2 md:gap-x-4">
					<p className="w-12 truncate text-right md:w-48">
						{user?.email ?? ''}
					</p>
					<Button onClick={signOut}>Sign Out</Button>
				</div>
			)}
			{!isAuthenticated && (
				<div className="flex items-center gap-x-2 md:gap-x-4">
					<Link href="/auth/sign-in">
						<OutlineButton>Sign In</OutlineButton>
					</Link>
					<Link href="/auth/sign-up">
						<Button>Sign Up</Button>
					</Link>
				</div>
			)}
		</NavbarContainer>
	);
};

import { trpcClient } from '@start/utils/trpc';
import {
	createContext,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

interface User {
	email: string;
}

interface UserContextValue {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: User | null;
	refresh: () => Promise<void>;
	signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [
		{ isAuthenticated = false, isLoading = false, user = null },
		setState,
	] = useState<{
		isAuthenticated: boolean;
		isLoading: boolean;
		user: User | null;
	}>({
		isAuthenticated: false,
		isLoading: false,
		user: null,
	});

	const getUser = async () => {
		setState((previous) => ({ ...previous, isLoading: true }));
		try {
			const { user } = await trpcClient.app.user.get.query();
			setState((previous) => ({ ...previous, isAuthenticated: true, user }));
		} catch (err) {
			console.error(err);
			setState((previous) => ({
				...previous,
				isAuthenticated: false,
				user: null,
			}));
		} finally {
			setState((previous) => ({ ...previous, isLoading: false }));
		}
	};

	const signOut = async () => {
		try {
			const { success } = await trpcClient.auth.user.signOut.mutate();
			if (success) {
				alert('Sign Out Successfully');
				setState((previous) => ({
					...previous,
					isAuthenticated: false,
					user: null,
				}));
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	// ✅ FIX: Memoize the value to keep it referentially stable
	const value = useMemo(
		() => ({
			isAuthenticated,
			isLoading,
			user,
			refresh: getUser,
			signOut,
		}),
		[isAuthenticated, isLoading, user, getUser, signOut],
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}

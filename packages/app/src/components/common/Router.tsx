import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
	useMemo,
} from 'react';

interface RouterContextType {
	path: string;
	navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

interface RouterProps {
	children: ReactNode;
}

export const Router: React.FC<RouterProps> = ({ children }) => {
	const [path, setPath] = useState<string>(window.location.pathname);

	useEffect(() => {
		const handlePop = () => setPath(window.location.pathname);
		window.addEventListener('popstate', handlePop);
		return () => window.removeEventListener('popstate', handlePop);
	}, []);

	const navigate = (to: string) => {
		window.history.pushState({}, '', to);
		setPath(to);
	};

	// useMemo to memoize the context value object
	const contextValue = useMemo(() => ({ path, navigate }), [path]);

	return (
		<RouterContext.Provider value={contextValue}>
			{children}
		</RouterContext.Provider>
	);
};

interface RouteProps {
	path: string;
	component: ReactNode;
}

export const Route: React.FC<RouteProps> = ({ path, component }) => {
	const context = useContext(RouterContext);
	if (!context) throw new Error('Route must be used within a Router');

	return context.path === path ? <>{component}</> : null;
};

interface LinkProps {
	to: string;
	children: ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, children }) => {
	const context = useContext(RouterContext);
	if (!context) throw new Error('Link must be used within a Router');

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		context.navigate(to);
	};

	return (
		<a href={to} onClick={handleClick}>
			{children}
		</a>
	);
};

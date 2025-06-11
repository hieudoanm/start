import { FC, ReactNode } from 'react';

export const Heading1: FC<{ children: ReactNode }> = ({ children = <></> }) => {
	return <h1 className="text-3xl font-black md:text-4xl">{children}</h1>;
};

export const Heading2: FC<{ children: ReactNode }> = ({ children = <></> }) => {
	return <h2 className="text-2xl font-extrabold md:text-3xl">{children}</h2>;
};

export const Heading3: FC<{ children: ReactNode }> = ({ children = <></> }) => {
	return <h3 className="text-xl font-bold md:text-2xl">{children}</h3>;
};

export const Heading4: FC<{ children: ReactNode }> = ({ children = <></> }) => {
	return <h4 className="text-lg font-semibold md:text-xl">{children}</h4>;
};

export const Heading5: FC<{ children: ReactNode }> = ({ children = <></> }) => {
	return <h5 className="text-base font-medium md:text-lg">{children}</h5>;
};

export const Heading6: FC<{ children: ReactNode }> = ({ children = <></> }) => {
	return <h6 className="text-sm font-normal md:text-base">{children}</h6>;
};

export const Paragraph: FC<{ children: ReactNode }> = ({
	children = <></>,
}) => {
	return <p className="text-sm md:text-base">{children}</p>;
};

export const Linear: FC<{ children: ReactNode }> = ({ children = <></> }) => {
	return (
		<span className="bg-gradient-to-r from-red-800 via-purple-800 to-blue-800 bg-clip-text text-transparent">
			{children}
		</span>
	);
};

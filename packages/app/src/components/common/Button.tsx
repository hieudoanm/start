import { FC, ReactNode } from 'react';

type ButtonType = 'button' | 'submit' | 'reset';

type ButtonSize = 'sm' | 'md' | 'lg';

export const Button: FC<{
	size?: ButtonSize;
	type?: ButtonType;
	disabled?: boolean;
	onClick?: () => void;
	children: ReactNode;
}> = ({
	size = 'md',
	type = 'button',
	disabled = false,
	onClick = () => {},
	children = <></>,
}) => {
	if (size === 'sm') {
		return (
			<button
				type={type}
				disabled={disabled}
				onClick={onClick}
				className="cursor-pointer rounded-full bg-gradient-to-r from-red-800 via-purple-800 to-blue-800 px-3 py-1 text-sm">
				{children}
			</button>
		);
	}

	if (size === 'lg') {
		return (
			<button
				type={type}
				disabled={disabled}
				onClick={onClick}
				className="cursor-pointer rounded-full bg-gradient-to-r from-red-800 via-purple-800 to-blue-800 px-4 py-2 text-base md:px-6 md:py-3 md:text-lg">
				{children}
			</button>
		);
	}

	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			className="cursor-pointer rounded-full bg-gradient-to-r from-red-800 via-purple-800 to-blue-800 px-3 py-1 text-sm md:px-4 md:py-2 md:text-base">
			{children}
		</button>
	);
};

export const OutlineButton: FC<{
	size?: ButtonSize;
	type?: ButtonType;
	disabled?: boolean;
	onClick?: () => void;
	children: ReactNode;
}> = ({
	size = 'md',
	type = 'button',
	disabled = false,
	onClick = () => {},
	children = <></>,
}) => {
	if (size === 'sm') {
		return (
			<div className="overflow-hidden rounded-full bg-gradient-to-r from-red-800 via-purple-800 to-blue-800 p-[1px]">
				<button
					type={type}
					disabled={disabled}
					onClick={onClick}
					className="w-full cursor-pointer rounded-full bg-neutral-900 px-3 py-1 text-sm">
					{children}
				</button>
			</div>
		);
	}

	if (size === 'lg') {
		return (
			<div className="overflow-hidden rounded-full bg-gradient-to-r from-red-800 via-purple-800 to-blue-800 p-[1px]">
				<button
					type={type}
					disabled={disabled}
					onClick={onClick}
					className="w-full cursor-pointer rounded-full bg-neutral-900 px-4 py-2 text-base md:px-6 md:py-3 md:text-lg">
					{children}
				</button>
			</div>
		);
	}

	return (
		<div className="overflow-hidden rounded-full bg-gradient-to-r from-red-800 via-purple-800 to-blue-800 p-[1px]">
			<button
				type={type}
				disabled={disabled}
				onClick={onClick}
				className="w-full cursor-pointer rounded-full bg-neutral-900 px-3 py-1 text-sm md:px-4 md:py-2 md:text-base">
				{children}
			</button>
		</div>
	);
};

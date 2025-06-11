import { FC } from 'react';

export const Toggle: FC<{ checked: boolean; onChange: () => void }> = ({
	checked = false,
	onChange = () => {},
}) => {
	return (
		<label
			aria-label="Toggle"
			className="relative block h-8 w-14 rounded-full bg-neutral-200 bg-gradient-to-r transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:from-red-600 has-checked:via-purple-600 has-checked:to-blue-600 dark:bg-neutral-800 dark:has-checked:from-red-700 dark:has-checked:via-purple-700 dark:has-checked:to-blue-700">
			<input
				type="checkbox"
				checked={checked}
				className="peer sr-only"
				onChange={onChange}
			/>
			<span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6 dark:bg-neutral-900"></span>
		</label>
	);
};

import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from 'react';

type InputProps = {
	type?: HTMLInputTypeAttribute;
	id?: string;
	name?: string;
	placeholder?: string;
	value?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	required?: boolean;
	readOnly?: boolean;
	disabled?: boolean;
};

export const Input: FC<InputProps> = ({
	type = 'text',
	id = '',
	name = '',
	placeholder = '',
	value = '',
	onChange = () => {},
	required = false,
	readOnly = false,
	disabled = false,
}) => {
	return (
		<div className="overflow-hidden rounded-full bg-gradient-to-r from-red-800 via-purple-800 to-blue-800 p-[1px]">
			<input
				type={type}
				id={id}
				name={name}
				placeholder={placeholder}
				className="w-full rounded-full bg-neutral-900 px-3 py-1 text-sm focus:outline-none md:px-4 md:py-2 md:text-base"
				value={value}
				onChange={onChange}
				required={required}
				readOnly={readOnly}
				disabled={disabled}
			/>
		</div>
	);
};

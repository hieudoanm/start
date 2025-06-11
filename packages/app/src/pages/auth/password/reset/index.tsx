import { Button } from '@start/components/common/Button';
import { Input } from '@start/components/common/Input';
import { AuthTemplate } from '@start/templates/AuthTemplate';
import { NextPage } from 'next';
import { useState } from 'react';

const PasswordResetPage: NextPage = () => {
	const [{ password = '', confirmPassword = '' }, setState] = useState<{
		password: string;
		confirmPassword: string;
	}>({
		password: '',
		confirmPassword: '',
	});

	return (
		<AuthTemplate>
			<form className="flex flex-col gap-y-4">
				<Input
					id="password"
					type="password"
					name="password"
					placeholder="Password"
					value={password}
					onChange={(event) => {
						setState((previous) => ({
							...previous,
							password: event.target.value,
						}));
					}}
				/>
				<Input
					id="password"
					type="confirmPassword"
					name="confirmPassword"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={(event) => {
						setState((previous) => ({
							...previous,
							confirmPassword: event.target.value,
						}));
					}}
				/>
				<Button>Reset Password</Button>
			</form>
		</AuthTemplate>
	);
};

export default PasswordResetPage;

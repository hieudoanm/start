import { Button, OutlineButton } from '@start/components/common/Button';
import { Input } from '@start/components/common/Input';
import { AuthTemplate } from '@start/templates/AuthTemplate';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

const PasswordForgetPage: NextPage = () => {
	const [{ email = '' }, setState] = useState<{ email: string }>({ email: '' });

	return (
		<AuthTemplate>
			<form className="flex flex-col gap-y-4">
				<Input
					id="email"
					type="email"
					name="email"
					placeholder="Email"
					value={email}
					onChange={(event) => {
						setState((previous) => ({
							...previous,
							email: event.target.value,
						}));
					}}
				/>
				<Button type="submit">Recover Password</Button>
				<Link href="/auth/sign-in">
					<OutlineButton>Back to Sign In</OutlineButton>
				</Link>
			</form>
		</AuthTemplate>
	);
};

export default PasswordForgetPage;

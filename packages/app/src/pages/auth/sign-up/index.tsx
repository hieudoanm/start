import { Button, OutlineButton } from '@start/components/common/Button';
import { Input } from '@start/components/common/Input';
import { AuthTemplate } from '@start/templates/AuthTemplate';
import { trpcClient } from '@start/utils/trpc';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const SignUpPage: NextPage = () => {
	const router = useRouter();
	const { push } = router;

	const [{ loading = false, name = '', email = '', password = '' }, setState] =
		useState<{
			loading: boolean;
			name: string;
			email: string;
			password: string;
		}>({ loading: false, name: '', email: '', password: '' });

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const response = await trpcClient.auth.user.signUp.mutate({
			email,
			password,
		});
		const { success } = response;
		if (success) {
			alert('Sign Up Successfully');
			push('/auth/sign-in');
		} else {
			alert('Failed to Sign Up');
		}
	};

	return (
		<AuthTemplate>
			<form onSubmit={onSubmit} className="flex flex-col gap-y-4">
				<Input
					id="name"
					type="name"
					name="name"
					placeholder="Name"
					value={name}
					onChange={(event) => {
						setState((previous) => ({ ...previous, name: event.target.value }));
					}}
					required
				/>
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
					required
				/>
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
					required
				/>
				<Button type="submit">{loading ? 'Loading' : 'Sign Up'}</Button>
				<Link href="/auth/sign-in">
					<OutlineButton>Sign In</OutlineButton>
				</Link>
			</form>
		</AuthTemplate>
	);
};

export default SignUpPage;

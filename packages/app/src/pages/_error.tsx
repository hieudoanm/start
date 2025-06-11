import { Button } from '@start/components/common/Button';
import Link from 'next/link';

const ErrorPage = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-white px-4 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
			<div className="text-center">
				<h1 className="text-9xl font-extrabold">404</h1>
				<p className="mt-4 text-2xl font-semibold">Page Not Found</p>
				<p className="mt-2">
					Sorry, the page you&apos;re looking for doesn&apos;t exist.
				</p>
				<Link href="/">
					<Button>Go Home</Button>
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;

import { Button } from '@start/components/common/Button';
import { Heading2, Heading6 } from '@start/components/common/Typography';
import Link from 'next/link';
import { FC } from 'react';

type CallToActionProps = { title: string; description: string; action: string };

export const CallToAction: FC<CallToActionProps> = ({
	title = '',
	description = '',
	action = '',
}) => {
	return (
		<section className="container mx-auto flex flex-col px-4 pt-8 pb-4 md:px-8 md:pt-16 md:pb-8">
			<div className="mx-auto w-full max-w-2xl space-y-4 md:space-y-8">
				<div className="flex flex-col gap-y-4 text-center">
					<Heading2>{title}</Heading2>
					<Heading6>{description}</Heading6>
				</div>
				<div className="flex w-full items-center justify-center">
					<Link href="/auth/sign-up">
						<Button size="lg">{action}</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

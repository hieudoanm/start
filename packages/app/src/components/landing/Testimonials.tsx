import { FC } from 'react';

export type TestimonialsProps = { quote: string; source: string };

export const Testimonials: FC<TestimonialsProps> = ({
	quote = '',
	source = '',
}) => {
	return (
		<section className="container mx-auto flex flex-col gap-y-8 px-4 py-8 md:gap-y-16 md:px-8 md:py-16">
			<div className="mx-auto w-full max-w-2xl">
				<div className="flex flex-col items-center justify-center gap-y-4 md:gap-y-8">
					<p className="text-center text-2xl font-medium">{quote}</p>
					<p>- {source} -</p>
				</div>
			</div>
		</section>
	);
};

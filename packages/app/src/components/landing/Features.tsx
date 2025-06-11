import { FC } from 'react';
import { Heading2, Heading6 } from '../common/Typography';

export type Feature = { emoji: string; title: string; description: string };

export type FeaturesProps = {
	title: string;
	description: string;
	features: Record<string, Feature>;
};

export const Features: FC<FeaturesProps> = ({
	title = '',
	description = '',
	features = {},
}) => {
	return (
		<section className="container mx-auto flex flex-col gap-y-4 px-4 md:gap-y-8 md:px-8">
			<div className="flex flex-col gap-y-4 text-center">
				<Heading2>{title}</Heading2>
				<Heading6>{description}</Heading6>
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
				{Object.entries(features)
					.map(([key, feature]) => {
						return { id: key, ...feature };
					})
					.map(({ id = '', emoji = '', title = '', description = '' }) => {
						return (
							<div key={id} className="col-span-1">
								<div className="flex flex-col items-center justify-center gap-y-2 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 shadow shadow-neutral-100/10 transition-all hover:scale-110 md:gap-y-4">
									<span className="text-4xl">{emoji}</span>
									<h3 className="text-bold text-xl">{title}</h3>
									<p className="text-center text-sm text-neutral-400">
										{description}
									</p>
								</div>
							</div>
						);
					})}
			</div>
		</section>
	);
};

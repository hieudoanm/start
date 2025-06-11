import { FC } from 'react';
import { Heading2, Heading6 } from '../common/Typography';

type QuestionAnswer = {
	question: string;
	answer: string;
};

export type FrequentlyAskedQuestionsProps = {
	title: string;
	description: string;
	questions: Record<string, QuestionAnswer>;
};

export const FrequentlyAskedQuestions: FC<FrequentlyAskedQuestionsProps> = ({
	title = '',
	description = '',
	questions = {},
}) => {
	return (
		<section className="container mx-auto flex flex-col gap-y-8 px-4 md:gap-y-16 md:px-8">
			<div className="flex flex-col gap-y-4 text-center">
				<Heading2>{title}</Heading2>
				<Heading6>{description}</Heading6>
			</div>
			<div className="divide-y divide-neutral-800 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 shadow-lg shadow-neutral-100/10">
				{Object.entries(questions)
					.map(([id, questionAnswer]) => ({ id, ...questionAnswer }))
					.map(({ id = '', question = '', answer = '' }, index: number) => {
						return (
							<details key={id} className="group">
								<summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
									<span className="font-semibold text-neutral-900 dark:text-neutral-100">
										{index + 1}. {question}
									</span>
									<span className="text-lg text-neutral-600 transition-all duration-300 group-open:rotate-180 dark:text-neutral-400">
										<span className="group-open:hidden">+</span>
										<span className="hidden group-open:inline">-</span>
									</span>
								</summary>
								<div className="px-4 pb-4 text-neutral-600 dark:text-neutral-400">
									{answer}
								</div>
							</details>
						);
					})}
			</div>
		</section>
	);
};

import { Button } from '@start/components/common/Button';
import { APP_NAME } from '@start/constants/constants';
import { trpcClient } from '@start/utils/trpc';
import { tryCatch } from '@start/utils/try-catch';
import { FC, useState } from 'react';
import { Linear } from '../common/Typography';

export const Hero: FC<{ description: string }> = ({ description = '' }) => {
	const [
		{
			loading = false,
			prompt = 'Explain how AI works in a few words',
			answer = '',
		},
		setState,
	] = useState<{
		loading: boolean;
		prompt: string;
		answer: string;
	}>({
		loading: false,
		prompt: 'Explain how AI works in a few words',
		answer: '',
	});

	return (
		<section className="border-b border-neutral-800 pb-8 md:pb-16">
			<div className="container mx-auto px-4 py-8 md:px-8 md:py-16">
				<div className="mx-auto w-full max-w-2xl space-y-4 text-center md:space-y-8">
					<h1 className="text-center text-5xl font-black md:text-6xl">
						<Linear>{APP_NAME}</Linear>
					</h1>
					<p className="text-center text-base md:text-lg">{description}</p>
					<div className="mx-auto w-full max-w-lg rounded-full shadow md:shadow-purple-900">
						<div className="overflow-hidden rounded-full bg-gradient-to-r from-red-800 via-purple-800 to-blue-800 p-[1px]">
							<div className="flex rounded-full bg-neutral-900 p-1 md:p-2">
								<input
									id="prompt"
									className="grow rounded-full border-0 px-3 py-1 text-sm focus:outline-none md:px-4 md:py-2 md:text-base"
									value={prompt}
									onChange={(event) => {
										setState((previous) => ({
											...previous,
											prompt: event.target.value,
										}));
									}}
								/>
								<Button
									disabled={loading}
									onClick={async () => {
										setState((previous) => ({ ...previous, loading: true }));
										const { data, error } = await tryCatch(
											trpcClient.app.gemini.generate.mutate({ prompt }),
										);
										setState((previous) => ({ ...previous, loading: false }));
										if (error) {
											console.error(error);
											alert(error.message);
											return;
										}
										if (!data) {
											alert('Invalid Response Data');
											return;
										}
										const answer =
											data.candidates.at(0)?.content.parts.at(0)?.text ?? '';
										if (!answer) {
											alert('Invalid Answer');
											return;
										}
										setState((previous) => ({ ...previous, answer }));
									}}>
									{loading ? 'Loading' : 'Search'}
								</Button>
							</div>
						</div>
					</div>
					{!loading && answer.length > 0 ? <p>{answer}</p> : <></>}
				</div>
			</div>
		</section>
	);
};

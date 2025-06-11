import { Shiki } from '@start/components/preview/Shiki';
import { PageTemplate } from '@start/templates/PageTemplate';
import { copy } from '@start/utils/clipboard/copy';
import { NextPage } from 'next';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const UtilsPage: NextPage<{ code: string }> = ({ code = '' }) => {
	return (
		<PageTemplate
			disabledSearch
			query=""
			setState={() => {}}
			id="tools-logger"
			emoji="📝"
			title="atomic/logger"
			description="">
			<section className="py-8 md:py-16">
				<div className="container mx-auto px-8">
					<div className="flex flex-col gap-y-4 md:gap-y-8">
						<div className="flex items-center justify-between gap-x-2">
							<div className="flex items-center gap-x-2">
								<span className="text-4xl">📝</span>
								<div>
									<p className="text-xs capitalize">Tools</p>
									<h3 className="text-xl font-bold capitalize md:text-2xl">
										Logger
									</h3>
								</div>
							</div>
							<button
								type="button"
								className="cursor-pointer rounded-lg border border-purple-800 bg-purple-600 px-4 py-2 text-white shadow dark:border-purple-900 dark:bg-purple-700 dark:shadow-neutral-100/10"
								onClick={() => copy(code)}>
								Copy
							</button>
						</div>
						<div className="flex items-center justify-center overflow-hidden rounded-lg border border-neutral-200 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
							<Shiki code={code} lang="ts" />
						</div>
					</div>
				</div>
			</section>
		</PageTemplate>
	);
};

export const getStaticProps = () => {
	const DEV_PATH = '../../../..';
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = join(dirname(__filename), DEV_PATH);

	const routerFilePath = `${__dirname}/src/log/logger.ts`;
	const code = readFileSync(routerFilePath, 'utf-8');
	return { props: { code } };
};

export default UtilsPage;

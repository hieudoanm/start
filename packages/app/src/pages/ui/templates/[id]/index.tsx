import { Code } from '@start/components/preview/Code';
import { FullScreen } from '@start/components/preview/FullScreen';
import { useToggle } from '@start/hooks/boolean/use-toggle';
import { PageTemplate } from '@start/templates/PageTemplate';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

type TemplateType = { id: string; name: string; code: string };

const TemplatePage: NextPage<{ template: TemplateType }> = ({
	template = { id: '', name: '', code: '' },
}) => {
	const { value: fullScreen, toggle } = useToggle(false);

	const { id = '', name = '', code = '' } = template;

	return (
		<PageTemplate
			disabledSearch
			query={''}
			setState={() => {}}
			id="templates"
			emoji="📝"
			title="atomic/templates"
			description="are responsive, professionally designed web and app templates created for SaaS platforms and marketing landing pages.">
			<section className="py-8 md:py-16">
				<div className="container mx-auto px-8">
					<div className="flex flex-col gap-y-4 md:gap-y-8">
						<button
							type="button"
							className="cursor-pointer rounded-md border border-purple-600 bg-purple-600 px-4 py-2 text-white shadow transition duration-200 hover:bg-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-700 dark:shadow-neutral-100/10 dark:hover:bg-purple-600"
							onClick={() => toggle()}>
							Full Screen
						</button>
						<Code id={id} emoji="📝" group="Template" name={name} code={code} />
					</div>
				</div>
			</section>
			{fullScreen && (
				<FullScreen name={name} code={code} onClose={() => toggle()} />
			)}
		</PageTemplate>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [
			{ params: { id: 'blog' } },
			{ params: { id: 'blogs' } },
			{ params: { id: 'chat' } },
			{ params: { id: 'dashboard' } },
			{ params: { id: 'error' } },
			{ params: { id: 'landing' } },
			{ params: { id: 'photos' } },
			{ params: { id: 'wallet' } },
		],
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<
	{ template: TemplateType },
	{ id: string }
> = (context) => {
	const DEV_PATH =
		process.env.NODE_ENV === 'development' ? '../../../..' : '../../../../..';
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = join(dirname(__filename), DEV_PATH);

	const id = context?.params?.id ?? '';
	const desktopPath: string = join(
		__dirname,
		`src/html/templates/desktop/${id}.html`,
	);
	const mobilePath: string = join(
		__dirname,
		`src/html/templates/mobile/${id}.html`,
	);
	let code: string = '';
	if (existsSync(desktopPath)) {
		code = readFileSync(desktopPath, 'utf-8');
	} else if (existsSync(mobilePath)) {
		code = readFileSync(mobilePath, 'utf-8');
	}
	const template = { id, name: id, code };

	return { props: { template } };
};

export default TemplatePage;

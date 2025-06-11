import { Icon } from '@start/components/preview/Icon';
import { PageTemplate } from '@start/templates/PageTemplate';
import { NextPage } from 'next';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { useState } from 'react';

type IconType = { id: string; name: string; code: string };

const IconsPage: NextPage<{ icons: IconType[] }> = ({ icons = [] }) => {
	const [{ query = '' }, setState] = useState<{ query: string }>({ query: '' });

	const filteredIcons = icons.filter(({ id, name }) => {
		return (
			id.toLowerCase().includes(query.toLowerCase()) ||
			name.toLowerCase().includes(query.toLowerCase())
		);
	});

	return (
		<PageTemplate
			query={query}
			setState={setState}
			id="assets-icons"
			emoji="🖼️"
			title="atomic/icons"
			description="is a free collection of carefully crafted SVG icons, designed to enhance modern user interfaces with scalable visuals.">
			<section className="py-8 md:py-16">
				<div className="container mx-auto px-8">
					<div className="flex flex-col gap-y-4 md:gap-y-8">
						<h2 className="text-2xl font-bold">
							<span className="capitalize">Icons</span> ({filteredIcons.length})
						</h2>
						{filteredIcons.length > 0 && (
							<div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 md:gap-8 lg:grid-cols-8 xl:grid-cols-10">
								{filteredIcons.map(({ id = '', name = '', code }) => {
									return (
										<div key={id} className="col-span-1 flex flex-col gap-y-2">
											<Icon name={name} code={code} />
											<p
												title="name"
												className="w-full truncate text-center text-xs">
												{name}
											</p>
										</div>
									);
								})}
							</div>
						)}
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

	const folders = readdirSync(join(__dirname, 'src/html/icons'));
	let icons: IconType[] = [];
	for (const folder of folders) {
		const path = join(__dirname, `src/html/icons/${folder}`);
		const svgs = readdirSync(path);

		const folderIcons = svgs.map((svg: string) => {
			const name: string = svg.split('/').at(-1) ?? '';
			const id: string = name?.replaceAll('.svg', '');
			const file = join(__dirname, `src/html/icons/${folder}/${svg}`);
			const code = readFileSync(file, 'utf-8');
			return { id, name, code };
		});
		icons = icons.concat(folderIcons);
	}

	return { props: { icons } };
};

export default IconsPage;

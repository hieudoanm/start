import { PageTemplate } from '@start/templates/PageTemplate';
import {
	Ubuntu_Mono,
	Fira_Code,
	Inter,
	JetBrains_Mono,
	Lato,
	Open_Sans,
	Roboto,
	Roboto_Mono,
	Merriweather,
	Source_Code_Pro,
} from 'next/font/google';
import { useState } from 'react';

const firaCode = Fira_Code({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });
const lato = Lato({ subsets: ['latin'], weight: '400' });
const merriweather = Merriweather({ subsets: ['latin'], weight: '400' });
const openSans = Open_Sans({ subsets: ['latin'] });
const roboto = Roboto({ subsets: ['latin'] });
const robotoMono = Roboto_Mono({ subsets: ['latin'] });
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });
const ubuntuMono = Ubuntu_Mono({ subsets: ['latin'], weight: '400' });

const fonts = [
	{ id: 'fira-code', name: 'Fira Code', className: firaCode.className },
	{ id: 'inter', name: 'Inter', className: inter.className },
	{
		id: 'jetbrains-mono',
		name: 'JetBrains Mono',
		className: jetBrainsMono.className,
	},
	{ id: 'lato', name: 'Lato', className: lato.className },
	{
		id: 'merriweather',
		name: 'Merriweather',
		className: merriweather.className,
	},
	{ id: 'open-sans', name: 'Open Sans', className: openSans.className },
	{ id: 'roboto', name: 'Roboto', className: roboto.className },
	{ id: 'roboto-mono', name: 'Roboto Mono', className: robotoMono.className },
	{
		id: 'source-code-pro',
		name: 'SourceCode Pro',
		className: sourceCodePro.className,
	},
	{ id: 'ubunto-mono', name: 'Ubuntu Mono', className: ubuntuMono.className },
];

const PHRASE = 'The quick brown fox jumps over the lazy dog.';

const FontsPage = () => {
	const [{ query = '' }, setState] = useState<{ query: string }>({ query: '' });

	const filteredFonts = fonts.filter(({ id, name }) => {
		return (
			id.toLowerCase().includes(query.toLowerCase()) ||
			name.toLowerCase().includes(query.toLowerCase())
		);
	});

	return (
		<PageTemplate
			query={query}
			setState={setState}
			id="assets-fonts"
			emoji="🔤"
			title="atomic/fonts"
			description="">
			<section className="py-8 md:py-16">
				<div className="container mx-auto px-8">
					<div className="flex flex-col gap-y-4 md:gap-y-8">
						<h3 className="text-2xl font-bold md:text-3xl">
							<span className="capitalize">Fonts</span> ({filteredFonts.length})
						</h3>
						{fonts.map(({ id, name, className }) => {
							return (
								<div key={id} className="flex flex-col gap-y-4 md:gap-y-8">
									<h3 className="text-xl font-semibold md:text-2xl">{name}</h3>
									<div className="overflow-hidden rounded-lg border border-neutral-200 p-4 text-xl shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
										<div className="overflow-y-auto whitespace-nowrap">
											<p className={className}>{PHRASE}</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</PageTemplate>
	);
};

export default FontsPage;

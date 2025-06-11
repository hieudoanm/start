import { AreaChart } from '@start/components/charts/Area';
import { BarChart } from '@start/components/charts/Bar';
import { BubbleChart } from '@start/components/charts/Bubble';
import { DoughnutChart } from '@start/components/charts/Doughnut';
import { LineChart } from '@start/components/charts/Line';
import { PolarChart } from '@start/components/charts/Polar';
import { RadarChart } from '@start/components/charts/Radar';
import { ScatterChart } from '@start/components/charts/Scatter';
import { ReactPreview } from '@start/components/preview/React';
import { PageTemplate } from '@start/templates/PageTemplate';
import { NextPage } from 'next';
import Link from 'next/link';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ReactNode, useState } from 'react';

type ChartType = { id: string; name: string; code: string };

const emojis: Record<string, string> = {
	line: '📈',
	bar: '📊',
	pie: '🥧',
	area: '🌊',
	scatter: '🎯',
	radar: '🕸️',
	bubble: '🫧',
	doughnut: '🍩',
	histogram: '🏗️',
	heatmap: '🔥',
	treemap: '🌳',
	polar: '🐻‍❄️',
	candlestick: '🕯️',
	waterfall: '💧',
	gauge: '⏱️',
	funnel: '⏬',
};

const data = [120, 180, 150, 200, 250, 300, 220];
const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const reactCharts: Record<string, ReactNode> = {
	area: <AreaChart data={data} labels={labels} />,
	bar: <BarChart data={data} labels={labels} />,
	bubble: (
		<BubbleChart
			data={[
				{ x: 1, y: 5, r: 10 },
				{ x: 2, y: 8, r: 15 },
				{ x: 3, y: 4, r: 8 },
				{ x: 4, y: 7, r: 12 },
				{ x: 5, y: 2, r: 5 },
			]}
			xLabels={['1', '2', '3', '4', '5']}
			yLabels={['0', '2', '4', '6', '8', '10']}
			xName="X Value"
			yName="Y Value"
		/>
	),
	doughnut: (
		<DoughnutChart
			data={[25, 15, 30, 10, 20]}
			labels={['Red', 'Blue', 'Yellow', 'Green', 'Purple']}
			title="Sales Distribution"
		/>
	),
	polar: (
		<PolarChart
			data={[30, 50, 80, 60, 40, 90, 70]}
			labels={['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Teal']}
			title="Polar Area Chart Example"
		/>
	),
	line: <LineChart data={data} labels={labels} />,
	radar: (
		<RadarChart
			data={[80, 60, 70, 90, 50]}
			labels={['Speed', 'Strength', 'Agility', 'Endurance', 'Flexibility']}
			title="Athlete Performance"
		/>
	),
	scatter: (
		<ScatterChart
			data={[
				{ x: 1, y: 2 },
				{ x: 2, y: 3.5 },
				{ x: 3, y: 1.2 },
				{ x: 4, y: 4 },
				{ x: 5, y: 2.5 },
			]}
			xLabel="Time (s)"
			yLabel="Value"
			title="Sample Scatter Plot"
		/>
	),
};

const ChartsPage: NextPage<{ charts: ChartType[] }> = ({ charts = [] }) => {
	const [{ query = '' }, setState] = useState<{ query: string }>({ query: '' });

	const filteredCharts = charts.filter(({ id, name }) => {
		return (
			id.toLowerCase().includes(query.toLowerCase()) ||
			name.toLowerCase().includes(query.toLowerCase())
		);
	});

	return (
		<PageTemplate
			query={query}
			setState={setState}
			id="ui-charts"
			emoji="📊"
			title="atomic/charts"
			description="is a curated set of responsive, customizable charts tailored specifically for SaaS products and marketing websites.">
			<section className="py-8 md:py-16">
				<div className="container mx-auto px-8">
					<div className="flex flex-col gap-y-4 md:gap-y-8">
						<h2 className="text-2xl font-bold">
							<span className="capitalize">Charts</span> (
							{filteredCharts.length})
						</h2>
						{filteredCharts.length > 0 && (
							<>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
									{filteredCharts.map(({ id = '', name = '' }) => {
										return (
											<Link href={`#${id}`} key={id}>
												<div className="col-span-1">
													<div className="flex items-center gap-x-2 rounded-lg border border-neutral-200 bg-white/40 p-4 shadow dark:border-neutral-800 dark:bg-neutral-900/40 dark:shadow-neutral-100/10">
														<p className="font-semibold capitalize">
															{emojis[id] ?? ''} {name}
														</p>
													</div>
												</div>
											</Link>
										);
									})}
								</div>
								<div className="flex flex-col gap-y-4 md:gap-y-8">
									{filteredCharts.map(({ id = '', name = '', code = '' }) => {
										return (
											<div key={id} className="flex flex-col gap-y-4">
												<h2 className="text-2xl font-bold capitalize">
													{emojis[id] ?? ''} {name}
												</h2>
												<ReactPreview
													id={id}
													emoji={emojis[id] ?? ''}
													group="Chart"
													name={name}
													code={code}
													chart={reactCharts[name]}
												/>
											</div>
										);
									})}
								</div>
							</>
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

	const files = readdirSync(join(__dirname, 'src/html/charts'));
	const charts = files.map((file: string) => {
		const id: string = file?.replaceAll('.html', '');
		const name: string = id.replaceAll('-', ' ');
		const filePath: string = join(__dirname, `src/html/charts/${file}`);
		const code: string = readFileSync(filePath, 'utf-8');
		return { id, name, code };
	});
	return { props: { charts } };
};

export default ChartsPage;

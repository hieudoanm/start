import { colors } from '@start/database/colors';
import { PageTemplate } from '@start/templates/PageTemplate';
import { copy } from '@start/utils/clipboard/copy';

const ColorsPage = () => {
	return (
		<PageTemplate
			query=""
			setState={() => {}}
			id="assets-colors"
			emoji=""
			title="atomic/colors"
			description="is an easy-to-access, curated collection of diverse emojis to enhance user experience and add personality to your interfaces.">
			<section className="py-8 md:py-16">
				<div className="container mx-auto px-8">
					<div className="mx-auto flex w-full max-w-2xl flex-col gap-y-4 md:gap-y-8">
						<h2 className="text-center text-3xl font-bold capitalize">
							Colors
						</h2>
						<div className="w-full overflow-y-auto">
							<table className="w-full">
								<thead>
									<tr>
										<th></th>
										<th className="w-12 px-2">50</th>
										<th className="w-12 px-2">100</th>
										<th className="w-12 px-2">200</th>
										<th className="w-12 px-2">300</th>
										<th className="w-12 px-2">400</th>
										<th className="w-12 px-2">500</th>
										<th className="w-12 px-2">600</th>
										<th className="w-12 px-2">700</th>
										<th className="w-12 px-2">800</th>
										<th className="w-12 px-2">900</th>
										<th className="w-12 px-2">950</th>
									</tr>
								</thead>
								<tbody>
									{Object.entries(colors).map(([name, shades]) => {
										return (
											<tr key={name}>
												<td className="capitalize">{name}</td>
												{Object.entries(shades).map(([shade, hex]) => {
													return (
														<td
															align="center"
															key={`${shade}-${hex}`}
															className="p-1">
															<button
																title={hex}
																className="aspect-square w-8 cursor-pointer rounded border border-neutral-200 shadow dark:border-neutral-800 dark:shadow-neutral-100/10"
																style={{ backgroundColor: hex }}
																onClick={() => {
																	copy(hex);
																}}></button>
														</td>
													);
												})}
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
		</PageTemplate>
	);
};

export default ColorsPage;

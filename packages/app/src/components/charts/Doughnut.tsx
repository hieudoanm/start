import { FC, useEffect, useRef } from 'react';

export const DoughnutChart: FC<{
	data: number[];
	labels: string[];
	colors?: string[];
	title?: string;
}> = ({ data = [], labels = [], colors, title = 'Doughnut Chart' }) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	// Default color palette if not provided
	const defaultColors = [
		'#3b82f6', // blue-500
		'#ef4444', // red-500
		'#f59e0b', // amber-500
		'#10b981', // emerald-500
		'#8b5cf6', // violet-500
		'#ec4899', // pink-500
		'#14b8a6', // teal-500
	];
	const sliceColors = colors || defaultColors;

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const width = canvas.width;
		const height = canvas.height;
		const centerX = width / 2;
		const centerY = height / 2;
		const radius = Math.min(width, height) / 2 - 40;
		const innerRadius = radius * 0.6; // hole size

		ctx.clearRect(0, 0, width, height);

		// Calculate total data sum
		const total = data.reduce((acc, val) => acc + val, 0);

		// Draw doughnut slices
		let startAngle = -Math.PI / 2; // start at top

		data.forEach((value, i) => {
			const sliceAngle = (value / total) * 2 * Math.PI;
			const endAngle = startAngle + sliceAngle;

			// Draw slice
			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius, startAngle, endAngle);
			ctx.closePath();

			ctx.fillStyle = sliceColors[i % sliceColors.length];
			ctx.fill();

			startAngle = endAngle;
		});

		// Draw inner circle (hole)
		ctx.beginPath();
		ctx.fillStyle = '#fff'; // white hole background
		ctx.moveTo(centerX, centerY);
		ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
		ctx.fill();

		// Dark mode hole background
		// Optional: You can switch fillStyle based on theme if you have a way to detect dark mode

		// Draw legend
		const legendX = width - 75;
		let legendY = 20;
		const boxSize = 16;
		const gap = 8;

		ctx.font = '14px sans-serif';
		ctx.textAlign = 'left';
		ctx.textBaseline = 'middle';

		labels.forEach((label, i) => {
			// Color box
			ctx.fillStyle = sliceColors[i % sliceColors.length];
			ctx.fillRect(legendX, legendY, boxSize, boxSize);

			// Text
			ctx.fillStyle = '#374151'; // neutral-700
			ctx.fillText(label, legendX + boxSize + gap, legendY + boxSize / 2);

			legendY += boxSize + gap;
		});

		// Draw chart title
		ctx.fillStyle = '#374151';
		ctx.font = '16px sans-serif';
		ctx.textAlign = 'center';
		ctx.fillText(title, centerX, 20);
	}, [data, labels, sliceColors, title]);

	return (
		<div className="w-full max-w-md rounded-lg border border-neutral-200 p-4 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
			<canvas
				ref={canvasRef}
				width={400}
				height={300}
				className="h-auto w-full"
			/>
		</div>
	);
};

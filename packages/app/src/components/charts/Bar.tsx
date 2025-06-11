import { FC, useEffect, useRef } from 'react';

export const BarChart: FC<{ data: number[]; labels: string[] }> = ({
	data = [],
	labels = [],
}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const width = canvas.width;
		const height = canvas.height;
		ctx.clearRect(0, 0, width, height);

		const padding = 40;
		const bottomPadding = 60;
		const leftPadding = 60;

		const chartWidth = width - leftPadding - padding;
		const chartHeight = height - bottomPadding - padding;

		const maxValue = Math.max(...data);
		const minValue = 0;

		// Draw grid lines (horizontal)
		ctx.strokeStyle = '#e5e7eb'; // neutral-200
		ctx.lineWidth = 1;

		const ySteps = 5;
		for (let i = 0; i <= ySteps; i++) {
			const y = padding + (chartHeight / ySteps) * i;
			ctx.beginPath();
			ctx.moveTo(leftPadding, y);
			ctx.lineTo(width - padding, y);
			ctx.stroke();
		}

		// Draw grid lines (vertical)
		const xSteps = labels.length;
		for (let i = 0; i < xSteps; i++) {
			const x =
				leftPadding + (chartWidth / xSteps) * i + chartWidth / xSteps / 2;
			ctx.beginPath();
			ctx.moveTo(x, padding);
			ctx.lineTo(x, height - bottomPadding);
			ctx.stroke();
		}

		// Draw Y axis labels
		ctx.fillStyle = '#374151'; // neutral-700
		ctx.font = '12px sans-serif';
		ctx.textAlign = 'right';
		ctx.textBaseline = 'middle';
		for (let i = 0; i <= ySteps; i++) {
			const y = padding + (chartHeight / ySteps) * i;
			const value = maxValue - ((maxValue - minValue) / ySteps) * i;
			ctx.fillText(value.toFixed(0), leftPadding - 8, y);
		}

		// Draw X axis labels
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		for (let i = 0; i < labels.length; i++) {
			const x =
				leftPadding + (chartWidth / xSteps) * i + chartWidth / xSteps / 2;
			ctx.fillText(labels[i], x, height - bottomPadding + 6);
		}

		// Draw axes
		ctx.strokeStyle = '#9ca3af'; // neutral-400
		ctx.lineWidth = 2;

		// Y axis
		ctx.beginPath();
		ctx.moveTo(leftPadding, padding);
		ctx.lineTo(leftPadding, height - bottomPadding);
		ctx.stroke();

		// X axis
		ctx.beginPath();
		ctx.moveTo(leftPadding, height - bottomPadding);
		ctx.lineTo(width - padding, height - bottomPadding);
		ctx.stroke();

		// Draw bars
		const barWidth = chartWidth / xSteps / 2; // half of the segment width
		ctx.fillStyle = '#3b82f6'; // blue-500
		for (let i = 0; i < data.length; i++) {
			const x =
				leftPadding +
				(chartWidth / xSteps) * i +
				chartWidth / xSteps / 2 -
				barWidth / 2;
			const y =
				padding + ((maxValue - data[i]) / (maxValue - minValue)) * chartHeight;
			const barHeight = height - bottomPadding - y;

			ctx.fillRect(x, y, barWidth, barHeight);
		}

		// Axis names
		ctx.fillStyle = '#374151'; // neutral-700
		ctx.font = '14px sans-serif';
		ctx.textAlign = 'center';

		// X-axis name
		ctx.fillText('Month', width / 2, height - 10);

		// Y-axis name
		ctx.save();
		ctx.translate(16, height / 2);
		ctx.rotate(-Math.PI / 2);
		ctx.fillText('Revenue ($)', 0, 0);
		ctx.restore();

		// Legend
		const legendX = width / 2 - 16;
		const legendY = 0;

		ctx.fillStyle = '#3b82f6';
		ctx.fillRect(legendX, legendY, 12, 12);

		ctx.fillStyle = '#374151';
		ctx.font = '12px sans-serif';
		ctx.textAlign = 'left';
		ctx.textBaseline = 'middle';
		ctx.fillText('Revenue', legendX + 16, legendY + 6);
	}, [data, labels]);

	return (
		<div className="w-full max-w-md rounded-lg border border-neutral-200 p-4 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
			<canvas
				ref={canvasRef}
				width={400}
				height={200}
				className="h-auto w-full"
			/>
		</div>
	);
};

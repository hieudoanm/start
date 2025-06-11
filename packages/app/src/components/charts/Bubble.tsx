import { FC, useEffect, useRef } from 'react';

type BubbleData = {
	x: number;
	y: number;
	r: number; // radius of bubble
};

export const BubbleChart: FC<{
	data: BubbleData[];
	xLabels: string[];
	yLabels: string[];
	xName?: string;
	yName?: string;
}> = ({
	data = [],
	xLabels = [],
	yLabels = [],
	xName = 'X Axis',
	yName = 'Y Axis',
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

		// Find min/max for scaling
		const xValues = data.map((d) => d.x);
		const yValues = data.map((d) => d.y);

		const xMin = Math.min(...xValues);
		const xMax = Math.max(...xValues);
		const yMin = Math.min(...yValues);
		const yMax = Math.max(...yValues);

		// Draw horizontal grid lines and Y labels
		ctx.strokeStyle = '#e5e7eb'; // neutral-200
		ctx.lineWidth = 1;

		const ySteps = yLabels.length - 1 || 5;
		for (let i = 0; i <= ySteps; i++) {
			const y = padding + (chartHeight / ySteps) * i;
			ctx.beginPath();
			ctx.moveTo(leftPadding, y);
			ctx.lineTo(width - padding, y);
			ctx.stroke();

			// Y labels
			ctx.fillStyle = '#374151'; // neutral-700
			ctx.font = '12px sans-serif';
			ctx.textAlign = 'right';
			ctx.textBaseline = 'middle';
			const label =
				yLabels[ySteps - i] ||
				(yMin + ((yMax - yMin) / ySteps) * (ySteps - i)).toFixed(0);
			ctx.fillText(label.toString(), leftPadding - 8, y);
		}

		// Draw vertical grid lines and X labels
		const xSteps = xLabels.length - 1 || 5;
		for (let i = 0; i <= xSteps; i++) {
			const x = leftPadding + (chartWidth / xSteps) * i;
			ctx.beginPath();
			ctx.moveTo(x, padding);
			ctx.lineTo(x, height - bottomPadding);
			ctx.stroke();

			// X labels
			ctx.fillStyle = '#374151';
			ctx.font = '12px sans-serif';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			const label =
				xLabels[i] || (xMin + ((xMax - xMin) / xSteps) * i).toFixed(0);
			ctx.fillText(label.toString(), x, height - bottomPadding + 6);
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

		// Plot bubbles
		data.forEach(({ x, y, r }) => {
			// Calculate position
			const xPos = leftPadding + ((x - xMin) / (xMax - xMin)) * chartWidth;
			const yPos = padding + ((yMax - y) / (yMax - yMin)) * chartHeight;

			ctx.beginPath();
			ctx.fillStyle = 'rgba(59, 130, 246, 0.6)'; // blue-500 with opacity
			ctx.strokeStyle = '#3b82f6'; // blue-500
			ctx.lineWidth = 1;
			ctx.arc(xPos, yPos, r, 0, 2 * Math.PI);
			ctx.fill();
			ctx.stroke();
		});

		// Axis names
		ctx.fillStyle = '#374151'; // neutral-700
		ctx.font = '14px sans-serif';
		ctx.textAlign = 'center';

		// X-axis name
		ctx.fillText(xName, width / 2, height - 10);

		// Y-axis name
		ctx.save();
		ctx.translate(16, height / 2);
		ctx.rotate(-Math.PI / 2);
		ctx.fillText(yName, 0, 0);
		ctx.restore();

		// Legend (single bubble)
		const legendX = width / 2 - 16;
		const legendY = 0;
		const legendRadius = 8;

		ctx.beginPath();
		ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
		ctx.strokeStyle = '#3b82f6';
		ctx.lineWidth = 1;
		ctx.arc(
			legendX + legendRadius,
			legendY + legendRadius,
			legendRadius,
			0,
			2 * Math.PI,
		);
		ctx.fill();
		ctx.stroke();

		ctx.fillStyle = '#374151';
		ctx.font = '12px sans-serif';
		ctx.textAlign = 'left';
		ctx.textBaseline = 'middle';
		ctx.fillText(
			'Bubble Size = Radius',
			legendX + legendRadius * 2 + 8,
			legendY + legendRadius,
		);
	}, [data, xLabels, yLabels, xName, yName]);

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

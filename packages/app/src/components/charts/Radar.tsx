import { FC, useEffect, useRef } from 'react';

type RadarChartProps = {
	data: number[]; // data points (one per axis)
	labels: string[]; // axis labels
	maxValue?: number; // max scale value (optional)
	title?: string; // chart title (optional)
};

export const RadarChart: FC<RadarChartProps> = ({
	data,
	labels,
	maxValue,
	title,
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

		const centerX = width / 2;
		const centerY = height / 2;
		const padding = 60;
		const radius = Math.min(width, height) / 2 - padding;

		const pointsCount = labels.length;
		const angleStep = (2 * Math.PI) / pointsCount;

		const scaleMax = maxValue ?? Math.max(...data, 1);
		const scaleMin = 0;

		// Draw concentric polygons (grid)
		ctx.strokeStyle = '#e5e7eb'; // neutral-200
		ctx.lineWidth = 1;

		const levels = 5;
		for (let level = 1; level <= levels; level++) {
			const r = (radius / levels) * level;
			ctx.beginPath();
			for (let i = 0; i < pointsCount; i++) {
				const angle = i * angleStep - Math.PI / 2;
				const x = centerX + r * Math.cos(angle);
				const y = centerY + r * Math.sin(angle);
				if (i === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.closePath();
			ctx.stroke();
		}

		// Draw axis lines and labels
		ctx.strokeStyle = '#9ca3af'; // neutral-400
		ctx.fillStyle = '#374151'; // neutral-700
		ctx.font = '12px sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		for (let i = 0; i < pointsCount; i++) {
			const angle = i * angleStep - Math.PI / 2;
			const x = centerX + radius * Math.cos(angle);
			const y = centerY + radius * Math.sin(angle);

			// axis line
			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.lineTo(x, y);
			ctx.stroke();

			// label (position slightly outside the radius)
			const labelX = centerX + (radius + 20) * Math.cos(angle);
			const labelY = centerY + (radius + 20) * Math.sin(angle);
			ctx.fillText(labels[i], labelX, labelY);
		}

		// Plot data polygon
		ctx.strokeStyle = '#3b82f6'; // blue-500
		ctx.fillStyle = 'rgba(59, 130, 246, 0.4)'; // blue-500 with opacity
		ctx.lineWidth = 2;
		ctx.beginPath();

		for (let i = 0; i < pointsCount; i++) {
			const valueRatio = (data[i] - scaleMin) / (scaleMax - scaleMin);
			const r = radius * valueRatio;
			const angle = i * angleStep - Math.PI / 2;
			const x = centerX + r * Math.cos(angle);
			const y = centerY + r * Math.sin(angle);
			if (i === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		// Draw data points
		ctx.fillStyle = '#1e40af'; // blue-800
		for (let i = 0; i < pointsCount; i++) {
			const valueRatio = (data[i] - scaleMin) / (scaleMax - scaleMin);
			const r = radius * valueRatio;
			const angle = i * angleStep - Math.PI / 2;
			const x = centerX + r * Math.cos(angle);
			const y = centerY + r * Math.sin(angle);

			ctx.beginPath();
			ctx.arc(x, y, 4, 0, 2 * Math.PI);
			ctx.fill();
		}

		// Title
		if (title) {
			ctx.fillStyle = '#374151'; // neutral-700
			ctx.font = '16px sans-serif';
			ctx.textAlign = 'center';
			ctx.fillText(title, centerX, padding / 2);
		}

		// Legend (single dataset)
		const legendX = width - 140;
		const legendY = 40;
		const radiusLegend = 8;

		ctx.fillStyle = '#3b82f6'; // blue-500
		ctx.beginPath();
		ctx.arc(
			legendX + radiusLegend,
			legendY + radiusLegend,
			radiusLegend,
			0,
			2 * Math.PI,
		);
		ctx.fill();

		ctx.fillStyle = '#374151'; // neutral-700
		ctx.font = '12px sans-serif';
		ctx.textAlign = 'left';
		ctx.textBaseline = 'middle';
		ctx.fillText(
			'Dataset 1',
			legendX + radiusLegend * 2 + 8,
			legendY + radiusLegend,
		);
	}, [data, labels, maxValue, title]);

	return (
		<div className="w-full max-w-md rounded-lg border border-neutral-200 p-4 shadow md:p-8 dark:border-neutral-800 dark:shadow-neutral-100/10">
			<canvas
				ref={canvasRef}
				width={400}
				height={400}
				className="h-auto w-full"
			/>
		</div>
	);
};

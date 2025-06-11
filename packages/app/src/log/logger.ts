type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
	level?: LogLevel;
	timestamp?: boolean;
}

const levelColors: Record<LogLevel, string> = {
	debug: '\x1b[36m', // cyan
	info: '\x1b[32m', // green
	warn: '\x1b[33m', // yellow
	error: '\x1b[31m', // red
};

const levelOrder: Record<LogLevel, number> = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3,
};

const resetColor = '\x1b[0m';

export const createLogger = (config: LoggerConfig = {}) => {
	const level = config.level ?? 'info';
	const timestamp = config.timestamp ?? true;

	const shouldLog = (msgLevel: LogLevel) =>
		levelOrder[msgLevel] >= levelOrder[level];

	const formatMessage = (
		msgLevel: LogLevel,
		message: string,
		context?: string,
	): string => {
		const color = levelColors[msgLevel];
		const timeStr = timestamp ? `[${new Date().toISOString()}] ` : '';
		const contextStr = context ? `[${context}] ` : '';
		return `${color}${timeStr}${contextStr}${msgLevel.toUpperCase()}: ${message}${resetColor}`;
	};

	const log = (msgLevel: LogLevel, message: string, context?: string) => {
		if (!shouldLog(msgLevel)) return;
		console.log(formatMessage(msgLevel, message, context));
	};

	return {
		debug: (msg: string, ctx?: string) => log('debug', msg, ctx),
		info: (msg: string, ctx?: string) => log('info', msg, ctx),
		warn: (msg: string, ctx?: string) => log('warn', msg, ctx),
		error: (msg: string, ctx?: string) => log('error', msg, ctx),
	};
};

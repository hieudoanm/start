const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY ?? '';

enum HttpMethod {
	Post = 'POST',
}

export enum GeminiModel {
	Gemini_2_0_Flash = 'gemini-2.0-flash',
	Gemini_2_0_Flash_Lite = 'gemini-2.0-flash-lite',
	Gemini_1_5_Flash = 'gemini-1.5-flash',
	Gemini_1_5_Flash_8b = 'gemini-1.5-flash-8b',
}

type GenerateResponse = {
	candidates: [
		{
			content: { parts: [{ text: string }]; role: string };
			finishReason: string;
			avgLogprobs: number;
		},
	];
	usageMetadata: {
		promptTokenCount: number;
		candidatesTokenCount: number;
		totalTokenCount: number;
		promptTokensDetails: [{ modality: string; tokenCount: number }];
		candidatesTokensDetails: [{ modality: string; tokenCount: number }];
	};
	modelVersion: string;
	responseId: string;
};

export const generateContent = async ({
	model = GeminiModel.Gemini_2_0_Flash,
	prompt,
}: {
	model: GeminiModel;
	prompt: string;
}): Promise<GenerateResponse> => {
	const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GOOGLE_GEMINI_API_KEY}`;
	const method = HttpMethod.Post;
	const headers: HeadersInit = { 'Content-Type': 'application/json' };
	const requestBody = { contents: [{ parts: [{ text: prompt }] }] };
	const body: string = JSON.stringify(requestBody);
	const response = await fetch(url, { method, headers, body });
	const data: GenerateResponse = await response.json();
	return data;
};

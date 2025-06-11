import { JWT } from '@start/utils/jwt';
import {
	CreateNextContextOptions,
	NextApiRequest,
	NextApiResponse,
} from '@trpc/server/adapters/next';

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
	const cookiesMap = new Map(Object.entries(req.cookies));
	const authToken: string = cookiesMap.get('auth-token') ?? '';
	if (!authToken) return { req, res, email: null };
	const { email } = JWT().verify(authToken);
	return { req, res, email };
};

export type Context = {
	req: NextApiRequest;
	res: NextApiResponse;
	email: string | null;
};

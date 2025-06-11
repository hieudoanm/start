import { router } from '../router';
import { gemini } from './app/gemini.router';
import { user } from './app/user.router';
import { authPassword } from './auth/password.router';
import { authUser } from './auth/user.router';

export const appRouter = router({
	auth: { user: authUser, password: authPassword },
	app: { user, gemini },
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create();
// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

export const privateMiddleware = t.middleware(({ ctx, next }) => {
	if (!ctx.email) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return next({
		ctx: {
			// Optionally, pass email along
			email: ctx.email,
		},
	});
});

export const privateProcedure = t.procedure.use(privateMiddleware);

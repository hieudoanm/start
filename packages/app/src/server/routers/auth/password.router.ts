import { publicProcedure } from '@start/server/router';
import { AuthService } from '@start/services/auth.service';
import { tryCatch } from '@start/utils/try-catch';
import z from 'zod';

export const authPassword = {
	forget: publicProcedure
		.input(z.object({ email: z.string() }))
		.mutation(async (options) => {
			const { email } = options.input;
			const { data, error } = await tryCatch(
				AuthService().password().forget({ email }),
			);
			if (error) {
				console.error(error.message);
				return { success: false };
			}
			return { success: data.success };
		}),
	reset: publicProcedure
		.input(z.object({ token: z.string(), password: z.string() }))
		.mutation(async (options) => {
			const { token, password } = options.input;
			const { data, error } = await tryCatch(
				AuthService().password().reset({ token, password }),
			);
			if (error) {
				console.error(error.message);
				return { success: false };
			}
			return { success: data.success };
		}),
};

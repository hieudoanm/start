import { privateProcedure } from '@start/server/router';
import { UserService } from '@start/services/user.service';
import { tryCatch } from '@start/utils/try-catch';
import { z } from 'zod';

export const user = {
	get: privateProcedure.query(async (options) => {
		const { email } = options.ctx;
		const { data: user, error } = await tryCatch(
			UserService().getUser({ email }),
		);
		if (error) {
			console.error(error.message);
			return { user: null };
		}
		return { user };
	}),
	password: {
		change: privateProcedure
			.input(
				z.object({
					email: z.string(),
					oldPassword: z.string(),
					newPassword: z.string(),
				}),
			)
			.mutation(async (options) => {
				const { email, oldPassword, newPassword } = options.input;
				const { data, error } = await tryCatch(
					UserService().changePassword({ email, oldPassword, newPassword }),
				);
				if (error) {
					console.error(error.message);
					return { success: true };
				}
				return { success: data.success };
			}),
	},
};

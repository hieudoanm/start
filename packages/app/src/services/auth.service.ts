import { prismaClient } from '@start/clients/database/prisma.client';
import { JWT } from '@start/utils/jwt';
import { Password } from '@start/utils/password';
import { tryCatch } from '@start/utils/try-catch';
import crypto from 'node:crypto';
import { EmailService } from '@start/services/email.service';

const signUp = async ({
	email = '',
	password = '',
}: {
	email: string;
	password: string;
}): Promise<{ success: boolean }> => {
	const hash = await Password(password).hash();
	await prismaClient.$connect();
	const { data: newUser, error } = await tryCatch(
		prismaClient.user.create({
			select: { email: true },
			data: { email, password: hash },
		}),
	);
	await prismaClient.$disconnect();
	if (error) throw new Error(error.message);
	if (!newUser) throw new Error('Failed to Sign Up');
	return { success: true };
};

const signIn = async ({
	email = '',
	password = '',
}: {
	email: string;
	password: string;
}): Promise<{ token: string; success: boolean }> => {
	const { data: user, error } = await tryCatch(
		prismaClient.user.findUnique({
			select: { email: true, password: true },
			where: { email },
		}),
	);
	if (error) throw new Error(error.message);
	if (!user) throw new Error('Invalid Email or Password');
	const { password: hash } = user;
	const verified: boolean = await Password(password).verify(hash);
	if (!verified) throw new Error('Invalid Email or Password');
	const token: string = JWT().generate({ email });
	return { token, success: true };
};

const user = ({ email, password }: { email: string; password: string }) => {
	return {
		signUp: () => signUp({ email, password }),
		signIn: () => signIn({ email, password }),
	};
};

const generateToken = () => {
	const token = crypto.randomBytes(32).toString('hex'); // 64 chars
	const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
	return { token, tokenHash };
};

const forgetPassword = async ({ email }: { email: string }) => {
	const { data: user, error: findError } = await tryCatch(
		prismaClient.user.findUnique({ select: { email: true }, where: { email } }),
	);
	if (findError) throw new Error(findError.message);
	if (!user) throw new Error('Invalid Email');
	const { token, tokenHash } = generateToken();
	const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // expires in 15 mins
	const { data: newPasswordResetToken, error } = await tryCatch(
		prismaClient.passwordResetToken.create({
			data: { userEmail: email, token: tokenHash, expiresAt },
		}),
	);
	if (error) throw new Error(error.message);
	if (!newPasswordResetToken) throw new Error('Failed to Create Token');
	const subject: string = 'Password Reset Request';
	const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Password Reset</h2>
        <p>You requested to reset your password. Please use the following code:</p>
        <p style="font-size: 20px; font-weight: bold; color: #2c3e50;">${token}</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `;
	const data = await EmailService().sendEmail({ to: email, subject, html });
	console.log(data);
	return { success: true };
};

const resetPassword = async ({
	token,
	password,
}: {
	token: string;
	password: string;
}) => {
	const tokenHash: string = crypto
		.createHash('sha256')
		.update(token)
		.digest('hex');
	const { data: passwordResetToken, error: findError } = await tryCatch(
		prismaClient.passwordResetToken.findUnique({
			where: { token: tokenHash },
			include: { user: true },
		}),
	);
	if (findError) throw new Error(findError.message);
	if (!passwordResetToken) throw new Error('Invalid token');
	if (passwordResetToken.used) throw new Error('Token already used');
	if (passwordResetToken.expiresAt < new Date())
		throw new Error('Token expired');
	const hash = await Password(password).hash();
	const { data, error: updateError } = await tryCatch(
		prismaClient.$transaction([
			prismaClient.user.update({
				where: { email: passwordResetToken.userEmail },
				data: { password: hash },
			}),
			prismaClient.passwordResetToken.update({
				where: { id: passwordResetToken.id },
				data: { used: true },
			}),
		]),
	);
	if (updateError) throw new Error(updateError.message);
	if (!data) throw new Error('Failed to Update');
	const [updatedUser, updatedPasswordResetToken] = data;
	if (!updatedUser) throw new Error('Failed to Update User');
	if (!updatedPasswordResetToken)
		throw new Error('Failed to Update Password Reset Token');
	return { success: true };
};

const password = () => {
	return { forget: forgetPassword, reset: resetPassword };
};

export const AuthService = () => {
	return { user, password };
};

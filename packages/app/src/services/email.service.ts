import { resend } from '@start/clients/email/resend.client';
import { CreateEmailResponse, CreateEmailResponseSuccess } from 'resend';

const FROM = 'onboarding@resend.dev';

const sendEmail = async ({
	from = FROM,
	to = '',
	subject = '',
	html = '',
}: {
	from?: string;
	to: string;
	subject: string;
	html: string;
}): Promise<CreateEmailResponseSuccess> => {
	const { data, error }: CreateEmailResponse = await resend.emails.send({
		from,
		to,
		subject,
		html,
	});
	if (error) throw new Error(error.message);
	if (!data) throw new Error('Invalid Data');
	return data;
};

export const EmailService = () => {
	return { sendEmail };
};

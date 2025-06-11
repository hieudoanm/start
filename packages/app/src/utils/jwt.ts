import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'super-secret';

const generate = ({ email }: { email: string }) => {
	// Sign a short-lived JWT
	const token = jwt.sign(
		{ email },
		JWT_SECRET,
		{ expiresIn: '1d' }, // expires in 15 minutes
	);
	return token;
};

const verify = (token: string): { email: string | null } => {
	try {
		const payload = jwt.verify(token, JWT_SECRET) as { email: string };
		return payload; // Payload: { email, iat, exp }
	} catch {
		return { email: null }; // Invalid, expired, or tampered
	}
};

export const JWT = () => {
	return { generate, verify };
};

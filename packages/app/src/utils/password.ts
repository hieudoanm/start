import bcrypt from 'bcrypt';

const hash = async (password: string): Promise<string> => {
	const saltRounds: number = 12; // cost factor
	return bcrypt.hash(password, saltRounds);
};

const verify = async (password: string, hash: string): Promise<boolean> => {
	return bcrypt.compare(password, hash);
};

export const Password = (password: string) => {
	return {
		hash: () => hash(password),
		verify: (hash: string) => verify(password, hash),
	};
};

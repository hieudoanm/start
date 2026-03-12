import { render } from '@testing-library/react';
import { LandingTemplate } from '../LandingTemplate';

jest.mock('../../../contexts/UserContext', () => ({
	useUser: () => ({
		isAuthenticated: false,
		isLoading: false,
		user: null,
		refresh: jest.fn(),
		signOut: jest.fn(),
	}),
}));

describe('LandingTemplate', () => {
	it('to match snapshot', () => {
		const { container } = render(<LandingTemplate />);
		expect(container).toMatchSnapshot();
	});
});

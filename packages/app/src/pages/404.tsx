import { ErrorTemplate } from '@start/templates/ErrorTemplate';

const NotFoundPage = () => {
	return (
		<ErrorTemplate
			code="404"
			title="Page Not Found"
			message="Sorry, the page you're looking for doesn't exist."
			action="Go Home"
		/>
	);
};

export default NotFoundPage;

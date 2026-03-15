import { render } from '@testing-library/react';
import { ErrorTemplate } from '../ErrorTemplate';

describe('ErrorTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <ErrorTemplate code={''} title={''} message={''} action={''} />
    );
    expect(container).toMatchSnapshot();
  });
});

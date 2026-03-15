import { render } from '@testing-library/react';
import { AuthTemplate } from '../AuthTemplate';

describe('AuthTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <AuthTemplate>
        <></>
      </AuthTemplate>
    );
    expect(container).toMatchSnapshot();
  });
});

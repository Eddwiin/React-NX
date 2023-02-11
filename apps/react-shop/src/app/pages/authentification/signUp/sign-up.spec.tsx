import { fireEvent, screen } from '@testing-library/react';
import SignUp from './sign-up';
import { reactI18nextMock, renderWithProviders } from './../../../helpers/test-helper';

reactI18nextMock();

describe('SignUp', () => {

  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<SignUp />);
    expect(baseElement).toBeTruthy();
  });

  it("should display required when value is invalid", async () => {
    const { container } = renderWithProviders(<SignUp />);
    fireEvent.submit(screen.getByRole('button'));

    expect(container.getElementsByClassName('error')).toHaveLength(6);
  })
});

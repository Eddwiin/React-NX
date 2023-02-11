import { act, fireEvent, screen } from '@testing-library/react';
import './../../../helpers/jest-mock';
import { renderWithProviders } from './../../../helpers/test-helper';
import SignUp from './sign-up';

describe('SignUp', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<SignUp />);
    expect(baseElement).toBeTruthy();
  });

  it('should display required when value is invalid', () => {
    const { container } = renderWithProviders(<SignUp />);
    fireEvent.submit(screen.getByTestId('submit'));
    console.log(container.getElementsByClassName('form-group_error').length);
    act(() =>
      expect(container.getElementsByClassName('form-group_error')).toHaveLength(
        6
      )
    );
  });
});

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
    act(() => {
      const el = screen.queryByTestId('sign-up-form');
      console.log(el)
    })

  });
});

import { renderWithProviders } from '../../../helpers/test-helper';

import ForgotPassword from './forgot-password';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
      return {
          t: (str: string): string => str,
      };
  },
}));

describe('ForgotPassword', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<ForgotPassword />);
    expect(baseElement).toBeTruthy();
  });
});

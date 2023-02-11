
import { renderWithProviders } from '../../../helpers/test-helper';
import ResetPassword from './reset-password';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
      return {
          t: (str: string): string => str,
      };
  },
}));
 
describe('ResetPassword', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<ResetPassword />);
    expect(baseElement).toBeTruthy();
  });
});

import { renderWithProviders } from '../../../helpers/test-helper';

import SignIn from './sign-in';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
      return {
          t: (str: string): string => str,
      };
  },
}));

describe('SignIn', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<SignIn />);
    expect(baseElement).toBeTruthy();
  });
});

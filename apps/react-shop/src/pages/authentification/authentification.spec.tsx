import { render } from '@testing-library/react';

import Authentification from './authentification';

describe('Authentification', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Authentification />);
    expect(baseElement).toBeTruthy();
  });
});

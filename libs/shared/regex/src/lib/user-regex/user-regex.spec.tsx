import { render } from '@testing-library/react';

import UserRegex from './user-regex';

describe('UserRegex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserRegex />);
    expect(baseElement).toBeTruthy();
  });
});

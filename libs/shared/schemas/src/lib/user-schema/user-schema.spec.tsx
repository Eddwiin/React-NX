import { render } from '@testing-library/react';

import UserSchema from './user-schema';

describe('UserSchema', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserSchema />);
    expect(baseElement).toBeTruthy();
  });
});

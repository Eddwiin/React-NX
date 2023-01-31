import { render } from '@testing-library/react';

import FormHooks from './form-hooks';

describe('FormHooks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormHooks />);
    expect(baseElement).toBeTruthy();
  });
});

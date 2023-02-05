import { render } from '@testing-library/react';

import SignUp from './sign-up';

describe('SignUp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignUp />);
    expect(baseElement).toBeTruthy();
  });

  describe('first_name', () => {
    it('should invalid when is inferior to 3 letter', () => {
      let { baseElement } = render(<SignUp />);
      console.log("BASE ELEMENT", baseElement)
    })

  })
});

import { findByText, render } from '@testing-library/react';

import Login from './index';

describe('Login', () => {
  let c = null;
  let bE = null;

  beforeAll(() => {
    const { baseElement, container } = render(<Login />);
    c = container;
    bE = baseElement;
  });
  it('should render successfully', () => {
    expect(bE).toBeTruthy();
  });
  it('should show buttons', () => {
    expect(findByText(c, 'Connect with wallet')).toBeTruthy();
    expect(findByText(c, 'Download mobile wallet')).toBeTruthy();
  });
  it('should render title', () => {
    expect(findByText(c, /Welcome/)).toBeTruthy();
  });

  it('should render input field', () => {
    expect(findByText(c, 'Insert your DID here')).toBeTruthy();
  });
});

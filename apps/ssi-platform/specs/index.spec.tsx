import React from 'react';
import { findByText, render } from '@testing-library/react';

import LandingPage from '../pages/index';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingPage />);
    expect(baseElement).toBeTruthy();
  });
});

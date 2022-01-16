import * as React from 'react';
import { render } from '@testing-library/react-native';

import { LoginAttemptModal } from './index';

test('renders correctly', () => {
  const { getByTestId } = render(
    <LoginAttemptModal open={true} loginAttemptMessage={'foo'} />
  );
  //@ts-ignore
  expect(getByTestId('header')).toHaveTextContent('Pending login attempt:');
  //@ts-ignore
  expect(getByTestId('button-decline')).toHaveTextContent('DECLINE');
  //@ts-ignore
  expect(getByTestId('button-accept')).toHaveTextContent('ACCEPT');
});

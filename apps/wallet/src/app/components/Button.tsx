import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

import t from '../shared/theme';

interface ButtonProps {
  onPress?: () => void;
  styles?: any[];
  label?: string;
}

export const Button = ({
  onPress = () => console.warn('pressed'),
  styles,
  label = 'Button',
}: ButtonProps) => {
  return (
    <TouchableOpacity
      testID={`button-${label.toLowerCase()}`}
      style={StyleSheet.compose(
        [
          t.p4,
          t.bgPrimary,
          t.roundedSm,
          t.flex,
          t.flexRow,
          t.justifyCenter,
          t.itemsCenter,
          t.m4,
        ],
        styles
      )}
      onPress={onPress}
    >
      <Text style={[t.textXl, t.uppercase, t.fontSansBold]}>{label}</Text>
    </TouchableOpacity>
  );
};

import { createTheme } from 'react-native-whirlwind'
import { Colors, DefaultTheme } from 'react-native-paper'
import { StyleSheet } from 'react-native'

const t = StyleSheet.create({
  ...createTheme({
    colors: {
      primary: Colors.blue500,
      secondary: Colors.blue600,
    },
    fontFamilies: {
      sans: 'Rubik-Medium',
      sansBold: 'Rubik-Bold',
      sansBoldItalic: 'Rubik-ExtraBold',
    },
  }),
  negativeZ: {
    zIndex: -1,
  },
})

export const CUSTOM_PAPER_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue500,
    accent: Colors.blue600,
    background: Colors.white,
    surface: Colors.white,
  },
  roundness: 12,
  dark: false,
}

export const CUSTOM_NAVIGATION_THEME = {
  dark: false,
  colors: {
    primary: Colors.blue500,
    background: Colors.white,
    card: Colors.white,
    text: Colors.blue500,
    border: Colors.white,
    notification: Colors.blue600,
  },
}

export const themeBox = [t.shadow2xl, t.bgWhite, t.rounded, t.p2]

export default t

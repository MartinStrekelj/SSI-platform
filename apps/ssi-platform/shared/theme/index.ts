import { extendTheme, theme as baseTheme } from '@chakra-ui/react'

import Button from './components/Button'

const theme = extendTheme({
  colors: {
    primary: baseTheme.colors.blue,
    secondary: baseTheme.colors.purple,
  },
  fonts: {
    body: 'Segoe UI, Rubik, system-ui, sans-serif',
    heading: 'Rubik, Georgia, serif',
    mono: 'Rubik, Menlo, monospace',
  },
  components: {
    Button,
  },
})

export default theme

import { ComponentStyleConfig, theme } from '@chakra-ui/theme'

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'bold',
  },
  sizes: theme.components.Button.sizes,
  variants: {
    primary: {
      bgGradient: 'linear(to-r, primary.500, secondary.500)',
      rounded: 'full',
      color: 'white',
      _hover: { color: 'gray.200' },
      textTransform: 'uppercase',
    },
    ghost: {
      ...theme.components.Button.variants.ghost,
      rounded: 'full',
    },
  },
}

export default Button

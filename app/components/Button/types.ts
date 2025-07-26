import { PressableProps, StyleProp, ViewStyle } from 'react-native'
import { ColorPath, TypographyPath } from 'ui-kit/design-tokens'

export type BaseButtonProps = PressableProps & {
  loading?: boolean
  disabled?: boolean
  containerStyle?: StyleProp<ViewStyle>
  loadingTitle?: string
  title?: string
  leadingIcon?: React.ReactNode
  textColor?: ColorPath
  textVariant: TypographyPath
  pressedStyle?: StyleProp<ViewStyle>
  innerContainerStyle?: StyleProp<ViewStyle>
  spinnerColor?: string
  style?: StyleProp<ViewStyle>
}

type VariantStyleConfig = {
  containerStyle: ViewStyle
  innerContainerStyle: ViewStyle
  textColor: ColorPath
  loadingColor: string
  pressedStyle?: ViewStyle
}

export type ButtonVariants = {
  primary: VariantStyleConfig
  secondary: VariantStyleConfig
}

type ButtonVariant = keyof ButtonVariants
type ButtonWrapperProps = Omit<
  BaseButtonProps,
  'containerStyle' | 'innerContainerStyle' | 'textVariant' | 'pressedStyle' | 'textColor'
>

export type ButtonVariantProps = ButtonWrapperProps & {
  variant?: ButtonVariant
}

import React from 'react'
import { View } from 'react-native'
import { BaseButton } from './BaseButton.component'
import { ButtonVariantProps, ButtonVariants } from './types'

export const Button = React.forwardRef<View, ButtonVariantProps>(
  ({ variant = 'primary', disabled, loading, ...props }, ref) => {
    const variantConfig = BUTTON_VARIANTS[variant]

    return (
      <BaseButton
        ref={ref}
        containerStyle={variantConfig.containerStyle}
        innerContainerStyle={variantConfig.innerContainerStyle}
        pressedStyle={variantConfig.pressedStyle}
        textColor={variantConfig.textColor}
        textVariant="title.large"
        disabled={disabled}
        spinnerColor={variantConfig.loadingColor}
        loading={loading}
        {...props}
      />
    )
  },
)

const BUTTON_VARIANTS: ButtonVariants = {
  primary: {
    containerStyle: {
      height: 64,
      borderRadius: 16,
      backgroundColor: 'blue',
      justifyContent: 'center',
    },
    innerContainerStyle: {
      justifyContent: 'center',
      borderColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    textColor: 'text.onPrimary',
    loadingColor: 'white',
    pressedStyle: {
      backgroundColor: 'darkblue',
    },
  },
  secondary: {
    containerStyle: {
      justifyContent: 'center',
      backgroundColor: 'lightgrey',
      height: 40,
      borderRadius: 14,
    },
    innerContainerStyle: {
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    textColor: 'text.onSecondary',
    loadingColor: 'grey',
    pressedStyle: {
      backgroundColor: 'darkgrey',
    },
  },
}

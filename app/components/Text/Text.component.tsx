import React from 'react'
import { Text as RNText, TextStyle } from 'react-native'
import { resolveTypographyPath, TypographyPath } from '../../design/typography'
// import { resolveColorPath } from 'ui-kit/design-tokens/colors/color-resolver'
// import { resolveTypographyPath } from 'ui-kit/design-tokens/typography'
// import { TypographyPath } from 'ui-kit/design-tokens/typography/types'
// import { ColorPath } from '../../design-tokens/colors/types'

type TextProps = React.ComponentProps<typeof RNText> & {
  children: React.ReactNode
  bold?: boolean
  color?: string
  variant?: TypographyPath
  style?: TextStyle | TextStyle[]
}

export const Text = ({
  children,
  variant = 'copy.medium',
  bold = false,
  color = 'text.primary',
  style,
  ...props // we already have access to onPress ;) just use it!
}: TextProps) => {
  const variantStyles = resolveTypographyPath(variant)

  const textStyle: TextStyle = {
    color: color,
    ...variantStyles,
    ...(Array.isArray(style) ? Object.assign({}, ...style) : style),
  }

  return (
    <RNText style={textStyle} {...props} suppressHighlighting>
      {children}
    </RNText>
  )
}

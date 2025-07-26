import { Spinner } from 'App/Components/_Reusable/Atoms/BrandedSpinner.atom'
import React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../Text'
import { BaseButtonProps } from './types'

export const BaseButton = React.forwardRef<View, BaseButtonProps>(
  (
    {
      loading = false,
      disabled = false,
      containerStyle,
      loadingTitle,
      title,
      leadingIcon,
      textVariant = 'title.large',
      pressedStyle,
      innerContainerStyle,
      spinnerColor,
      textColor,
      style,
      ...props
    },
    ref,
  ) => (
    <Pressable
      ref={ref}
      disabled={disabled || loading}
      style={({ pressed }) => [
        containerStyle,
        pressed && pressedStyle,
        disabled && !loading && { backgroundColor: color.primary.disabled },
        style,
      ]}
      {...props}
    >
      <View style={innerContainerStyle}>
        {loading && <Spinner stroke={spinnerColor} />}
        {(!loading || loadingTitle !== undefined) && (
          <>
            {leadingIcon && <View style={{ paddingRight: title ? 8 : 0 }}>{leadingIcon}</View>}
            <Text variant={textVariant} color={textColor} style={{ paddingLeft: loading ? 8 : 0 }}>
              {loading ? loadingTitle : title}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  ),
)

import * as React from 'react'
import { memo } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { responsiveWidth } from '../../design/utilities'
import { FooterProps } from './types'


export const Footer = memo(
  ({
    children,
    style,
    handleSafeArea = true,

    setWidth = false,
  }: FooterProps) => {
    return handleSafeArea ? (
      <SafeAreaView>

        <View style={[styles.footerContainer, setWidth ? responsiveWidth : null, , style]}>
          {children}
        </View>
      </SafeAreaView>
    ) : (
      <View style={style}>{children}</View>
    )
  },
)
const styles = StyleSheet.create({
  footerContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
})

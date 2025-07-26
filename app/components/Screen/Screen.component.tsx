import * as React from 'react'
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native'
import { Content } from './Content.component'
import { Footer } from './Footer.component'
import { Header } from './Header.component'
import { ScreenProps } from './types'
import { grey_background } from '../../index/theme'

const ScreenRoot = ({
  children,
  style,
  statusBarStyle = 'dark-content',
  statusBarBackgroundColor = grey_background,
}: ScreenProps) => (
  <KeyboardAvoidingView
    style={[{ flex: 1, backgroundColor: grey_background }, style]}
    enabled={true}
    behavior={Platform.OS == 'ios' ? 'padding' : undefined}
  >
    <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBackgroundColor} />
    {children}
  </KeyboardAvoidingView>
)

export const Screen = Object.assign(ScreenRoot, {
  Header,
  Content,
  Footer,
})

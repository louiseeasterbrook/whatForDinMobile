import { ReactElement, ReactNode } from 'react'
import {
  StyleProp,
  ViewProps,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  PressableProps,
  ScrollViewProps,
} from 'react-native'

export interface ScreenProps extends ViewProps {
  children: React.ReactNode
  statusBarStyle?: 'default' | 'dark-content' | 'light-content'
  statusBarBackgroundColor?: string
}

export type LeftIconButtonProps = PressableProps & { color?: string }

export interface ContentProps extends ViewProps {
  children: React.ReactNode
  withMargin?: boolean
  scrollable?: boolean
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  setWidth?: boolean
  refreshControl?: JSX.Element
  scrollViewProps?: ScrollViewProps
}

export interface FooterProps extends ViewProps {
  children?: React.ReactNode
  handleSafeArea?: boolean
  withDivider?: boolean
  behindKeyboard?: boolean
  setWidth?: boolean
}
export type HeadingProps = {
  children: React.ReactNode
}

export type HeaderProps = {
  children?: ReactNode
  leftComponent?: ReactElement
  rightComponent?: ReactElement
  title?: string
  style?: StyleProp<ViewStyle>
  handleSafeArea?: boolean
}

import { ArrowLeft, Xmark } from 'iconoir-react-native'
import React, { FC, memo } from 'react'
import { Pressable, PressableProps, SafeAreaView, StyleSheet, View } from 'react-native'
import { HeaderProps, LeftIconButtonProps } from './types'
import { Text } from '../Text'

const LeftIconButton = memo((props: LeftIconButtonProps) => (
  <Pressable {...props}>
    <ArrowLeft width={24} height={24} color={props.color || 'black'} strokeWidth={2} />
  </Pressable>
))

const CrossIconButton = memo((props: PressableProps) => (
  <Pressable {...props}>
    <Xmark color={'black'} width={32} height={32} strokeWidth={2} />
  </Pressable>
))

type RightTextButtonProps = {
  onPress: () => void
}

const RightCancelButton: FC<RightTextButtonProps> = memo(({ onPress }) => (
  <Text
    variant="title.medium"
    color="text.emphasis"
    onPress={onPress}
    accessibilityRole="button"
    style={{ marginBottom: -1.5 }}
  >
    Cancel
  </Text>
))

const RightManageButton: FC<RightTextButtonProps> = memo(({ onPress }) => (
  <Text
    variant="title.medium"
    color="text.emphasis"
    onPress={onPress}
    accessibilityRole="button"
    style={{ marginBottom: -1.5 }}
  >
    Manage
  </Text>
))

const HeaderBase = ({
  children = null,
  leftComponent = undefined,
  rightComponent = undefined,
  title = '',
  style = null,
  handleSafeArea = true,
}: HeaderProps) => {
  const RenderHeader = () => (
    <View style={[styles.headerContainer, style]}>
      {children ? (
        children
      ) : (
        <View style={styles.headerRow}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>{leftComponent}</View>
          <Text
            variant="title.large"
            color="text.primary"
            style={styles.titleText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>{rightComponent}</View>
        </View>
      )}
    </View>
  )

  return handleSafeArea ? (
    <SafeAreaView>
      <RenderHeader />
    </SafeAreaView>
  ) : (
    <View style={style}>
      <RenderHeader />
    </View>
  )
}

export const Header = Object.assign(HeaderBase, {
  LeftIconButton,
  CrossIconButton,
  RightCancelButton,
  RightManageButton,
})

const styles = StyleSheet.create({
  headerContainer: {
    height: 48,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  titleText: {
    flex: 3,
    textAlign: 'center',
  },
})

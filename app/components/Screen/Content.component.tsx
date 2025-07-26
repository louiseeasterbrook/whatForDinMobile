import * as React from 'react'
import { memo, useRef, useState, useEffect } from 'react'
import { ScrollView, Dimensions, TextInput, Keyboard, View } from 'react-native'
import { responsiveWidth } from '../../design/utilities'
import { ContentProps } from './types'

export const Content = memo((props: ContentProps) => {
  const {
    children,
    style,
    withMargin = true,
    scrollable = false,
    refreshControl = undefined,
    onScroll = undefined,
    setWidth = false,
    ...remaining
  } = props

  const scrollViewRef = useRef<ScrollView>(null)
  const [newContentOffsetY, _setNewContentOffsetY] = useState(0)
  const [orgContentOffsetY, setOrgContentOffsetY] = useState(0)

  const newContentOffsetYRef = useRef(newContentOffsetY)

  const setNewContentOffsetY = (y) => {
    _setNewContentOffsetY(y)
    newContentOffsetYRef.current = y
  }

  const handleKeyboardDidShow = (e) => {
    /*
      This function extends the functionality of KeyboardAvoidingView to add additional scroll.
      We need this extra scroll to fully move the Input components above the keyboard.
    */
    const { height: windowHeight } = Dimensions.get('window')
    const keyboardHeight = e.endCoordinates.height
    const currentlyFocusedInputRef = TextInput.State.currentlyFocusedInput()
    const stickyFooterHeight = 80 // Temporary
    const extraGap = 16

    currentlyFocusedInputRef?.measure((x, height, pageY) => {
      const gap = windowHeight - (keyboardHeight + stickyFooterHeight) - (pageY + height)

      if (scrollViewRef?.current) {
        if (gap <= 0) {
          scrollViewRef.current?.scrollTo({
            x,
            y: Math.abs(gap) + height + extraGap + newContentOffsetYRef.current,
            animated: true,
          })
        }
      }
    })
  }

  const handleKeyboardDidHide = () => {
    if (scrollViewRef?.current) {
      /*
        When keyboard hides, revert the extra scroll we added on handleKeyboardDidShow
      */
      setTimeout(() => scrollViewRef.current?.scrollTo({ x: 0, y: orgContentOffsetY }), 5)
    }
  }

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow)
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide)

    return () => {
      keyboardDidShow.remove()
      keyboardDidHide.remove()
    }
  }, [])

  return scrollable ? (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      refreshControl={refreshControl}
      onScroll={onScroll}
      scrollEventThrottle={16}
      ref={scrollViewRef}
      alwaysBounceVertical={false}
      keyboardShouldPersistTaps={'always'}
      onMomentumScrollBegin={(event) => {
        if (event.nativeEvent.contentOffset.y === 0) return

        setOrgContentOffsetY(event.nativeEvent.contentOffset.y)
      }}
      onMomentumScrollEnd={(event) => {
        setNewContentOffsetY(event.nativeEvent.contentOffset.y)
      }}
    >
      <View
        style={[
          {
            marginHorizontal: withMargin ? 16 : 0,
            flex: 1,
            ...(setWidth ? responsiveWidth : null),
          },
          style,
        ]}
        {...remaining}
      >
        {children}
      </View>
    </ScrollView>
  ) : (
    <View
      style={[
        {
          marginHorizontal: withMargin ? 16 : 0,
          flex: 1,
          ...(setWidth ? responsiveWidth : null),
        },
        style,
      ]}
      {...remaining}
    >
      {children}
    </View>
  )
})

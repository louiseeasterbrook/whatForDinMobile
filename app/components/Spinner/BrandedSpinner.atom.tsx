import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Easing, ViewStyle } from 'react-native'
import Svg, { Circle } from 'react-native-svg'



export interface SpinnerProps {
  style?: ViewStyle
  stroke?: string
  strokeWidth?: number
  size?: number // width/height in pixels
}

export function Spinner(props: SpinnerProps) {
  const { stroke = 'white', strokeWidth = 2, size = 24 } = props

  const outerCircleOpacity: number = 1
  const innerCircleRadius: number = 12.75

  const AnimatedCircle = Animated.createAnimatedComponent(Circle)

  const circleRef = useRef<typeof AnimatedCircle | null>(null)

  const rotateAnimation = useMemo(() => new Animated.Value(0), [])
  const dashAnimation = useMemo(() => new Animated.Value(0), [])

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start()
    Animated.loop(
      Animated.timing(dashAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      })
    ).start()
  })

  let FINAL_DASH_WIDTH: number
  let MID_DASH_WIDTH: number
  let START_DASH_WIDTH: number
  let START_DASH_OFFSET: number
  let MID_DASH_OFFSET: number
  let FINAL_DASH_OFFSET: number

  //these pixel values are responsive based on the size of the spinner
 
    FINAL_DASH_WIDTH = 3.333 * size
    MID_DASH_WIDTH = 3.708 * size
    START_DASH_WIDTH = 1
    START_DASH_OFFSET = 0
    MID_DASH_OFFSET = -0.833 * size
    FINAL_DASH_OFFSET = -2.416 * size
  

  // You can't add a listener to an interpolated value, so we need to interpoliate
  // it ourselves.
  const interpolate = (
    progress: number,
    inStart: number,
    inEnd: number,
    outStart: number,
    outEnd: number
  ) => {
    return (
      outStart +
      (outEnd - outStart) * ((progress - inStart) / (inEnd - inStart))
    )
  }

  const animateDashwidth = ({ value: v }): void => {
    let interpolatedValue
    if (v >= 0.5) {
      interpolatedValue = interpolate(
        v,
        0.5,
        1,
        MID_DASH_WIDTH,
        FINAL_DASH_WIDTH
      )
    } else {
      interpolatedValue = interpolate(
        v,
        0,
        0.5,
        START_DASH_WIDTH,
        MID_DASH_WIDTH
      )
    }

    const data = {
      strokeDasharray: [interpolatedValue, 200],
    }

    circleRef.current?.setNativeProps(data)
  }

  dashAnimation.addListener(animateDashwidth)

  const dashOffset = dashAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [START_DASH_OFFSET, MID_DASH_OFFSET, FINAL_DASH_OFFSET],
  })

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          transform: [
            {
              rotate: rotateAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['-90deg', '270deg'],
              }),
            },
          ],
        },
        props.style,
      ]}
    >
      <Svg
        style={{
          width: '100%',
          height: '100%',
        }}
        viewBox="25 25 50 50"
      >
        <Circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth={`${strokeWidth}px`}
          vectorEffect="non-scaling-stroke"
          stroke={stroke}
          opacity={outerCircleOpacity}
        ></Circle>
        <AnimatedCircle
          ref={circleRef}
          originX="50"
          originY="50"
          cx="50"
          cy="50"
          r={innerCircleRadius}
          fill="none"
          strokeWidth={`${strokeWidth}px`}
          vectorEffect="non-scaling-stroke"
          stroke={stroke}
          strokeMiterlimit="10"
          strokeDasharray="1, 200"
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </Svg>
    </Animated.View>
  )
}

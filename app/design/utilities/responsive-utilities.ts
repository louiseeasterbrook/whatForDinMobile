import { Dimensions, ViewStyle } from 'react-native'

export const MAX_SCREEN_HEIGHT = 500
export const MAX_SCREEN_WIDTH = 499

//if you need to export this width function, please move it to a separate file
const width = Math.round(Dimensions.get('window').width)

export const responsiveWidth: ViewStyle = {
  minWidth: width > MAX_SCREEN_HEIGHT ? Math.min(width, MAX_SCREEN_HEIGHT) : null,
  maxWidth: MAX_SCREEN_HEIGHT,
  alignSelf: width > MAX_SCREEN_HEIGHT ? 'center' : 'stretch',
}

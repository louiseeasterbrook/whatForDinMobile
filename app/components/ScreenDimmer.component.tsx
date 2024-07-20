import {StyleSheet, View} from 'react-native';

export const ScreenDimmer = ({}) => {
  return <View style={styles.dimmer}></View>;
};

const styles = StyleSheet.create({
  dimmer: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.2,
  },
});

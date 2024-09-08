import {ReactNode, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {main_colour} from '../../index/theme';

type ImageSliderProps = {
  images: string[];
};

export const ImageSlider = ({images}: ImageSliderProps): ReactNode => {
  const [active, setActive] = useState(null);
  const {width} = Dimensions.get('window');
  const height = width * 0.7;
  const change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  return (
    <View>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={change}
        showsHorizontalScrollIndicator
        style={{width, height}}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{uri: image}}
            style={{width, height, resizeMode: 'cover'}}></Image>
        ))}
      </ScrollView>
      {images?.length > 1 && (
        <View style={styles.pagination}>
          {images.map((i, k) => (
            <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
              •
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center',
  },
  dot: {
    color: '#FFF',
    fontSize: 50,
  },
  activeDot: {
    color: main_colour,
    fontSize: 50,
  },
});

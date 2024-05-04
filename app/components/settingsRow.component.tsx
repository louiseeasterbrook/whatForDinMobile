import {ReactNode} from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {secondary_colour} from '../index/theme';

type SettingsRowProps = {
  title: string;
  onPress: () => void;
};

export const SettingsRow = ({title, onPress}: SettingsRowProps): ReactNode => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.mainContainer}>
        <Text style={styles.mainTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginVertical: 4,
    backgroundColor: secondary_colour,
    borderRadius: 4,
  },
  mainTitle: {
    fontSize: 14,
  },
});

import {ReactNode} from 'react';
import {Icon, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {secondary_colour} from '../index/theme';

type SettingsRowProps = {
  title: string;
  topRow?: boolean;
  bottomRow?: boolean;
  icon?: string;
  onPress: () => void;
};

export const SettingsRow = ({
  title,
  onPress,
  topRow = false,
  bottomRow = false,
  icon,
}: SettingsRowProps): ReactNode => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.mainContainer,
          topRow && styles.topRow,
          bottomRow && styles.bottomRow,
        ]}>
        <Text style={styles.mainTitle}>{title}</Text>
        {icon && <Icon source={icon} size={18} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: secondary_colour,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
  mainTitle: {
    fontSize: 14,
  },
  topRow: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  bottomRow: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});

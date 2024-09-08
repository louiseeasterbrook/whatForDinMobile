import {ReactNode} from 'react';
import {Icon, Text} from 'react-native-paper';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {SHADOW_BASE, secondary_colour} from '../index/theme';
import {PrimaryText} from './PrimaryText.component';

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
    <TouchableHighlight onPress={onPress} underlayColor={secondary_colour}>
      <View
        style={[
          styles.mainContainer,
          topRow && styles.topRow,
          bottomRow && styles.bottomRow,
        ]}>
        <PrimaryText text={title} size={14} />
        {icon && <Icon source={icon} size={18} />}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomColor: '#fefefe',
    borderBottomWidth: 2,
    ...SHADOW_BASE,
  },
  topRow: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bottomRow: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});

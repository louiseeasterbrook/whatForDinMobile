import {ReactNode} from 'react';
import {Icon, Text} from 'react-native-paper';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {SHADOW_BASE, main_colour, secondary_colour} from '../index/theme';

type OptionProps = {
  title: string;
  selected?: boolean;
  colour?: string;
  icon?: string;
  onPress: () => void;
};

export const Option = ({
  title,
  onPress,
  colour = '#FFFFFF',
  icon,
  selected = false,
}: OptionProps): ReactNode => {
  return (
    <TouchableHighlight
      style={[
        styles(colour).mainContainer,
        selected && styles(colour).selected,
      ]}
      onPress={onPress}
      underlayColor={secondary_colour}>
      <View style={styles(colour).innerContainer}>
        {icon && (
          <View style={styles(colour).icon}>
            <Icon source={icon} size={18} />
          </View>
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = (colour: string) =>
  StyleSheet.create({
    mainContainer: {
      height: 50,
      width: 50,
      alignSelf: 'flex-start',
      paddingHorizontal: 14,
      paddingVertical: 10,
      backgroundColor: colour,
      borderRadius: 12,
      borderWidth: 3,
      borderColor: 'transparent',
      ...SHADOW_BASE,
      margin: 2,
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selected: {
      borderColor: main_colour,
    },
  });

import {ReactNode} from 'react';
import {Icon} from 'react-native-paper';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {SHADOW_BASE, main_colour, secondary_colour} from '../index/theme';
import {PrimaryText} from './PrimaryText.component';

type TagProps = {
  title: string;
  colour: string;
  icon?: string;
  onPress?: () => void;
  selected?: boolean;
};

export const Tag = ({
  title,
  onPress,
  colour = 'white',
  icon = 'food-variant',
  selected = false,
}: TagProps): ReactNode => {
  return (
    <TouchableHighlight
      style={[
        styles(colour).mainContainer,
        selected && styles(colour).selected,
      ]}
      onPress={onPress}
      underlayColor={secondary_colour}>
      <View style={[styles(colour).innerContainer]}>
        {icon && (
          <View style={styles(colour).icon}>
            <Icon source={icon} size={18} />
          </View>
        )}
        <PrimaryText text={title} size={14} />
      </View>
    </TouchableHighlight>
  );
};

const styles = (colour: string) =>
  StyleSheet.create({
    mainContainer: {
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 5,
      backgroundColor: colour,
      borderRadius: 12,
      borderWidth: 3,
      borderColor: 'transparent',
      ...SHADOW_BASE,
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      paddingRight: 5,
    },
    selected: {
      borderColor: main_colour,
    },
  });

import {ReactNode} from 'react';
import {Text, ActivityIndicator} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {disabled_grey, main_colour} from '../index/theme';

type PrimaryButtonProps = {
  text: string;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
};

export const PrimaryButton = ({
  text,
  onPress,
  disabled = false,
  loading = false,
}: PrimaryButtonProps): ReactNode => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles(disabled).mainContainer}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator animating={true} color={'white'} />
      ) : (
        <Text style={styles(disabled).text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = (disabled: boolean) =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 14,
      paddingVertical: 16,
      backgroundColor: disabled ? disabled_grey : main_colour,
      borderRadius: 12,
    },
    text: {
      color: 'white',
      letterSpacing: 1,
      fontFamily: 'Quicksand-SemiBold',
    },
  });

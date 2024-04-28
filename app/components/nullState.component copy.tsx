import {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Icon} from 'react-native-paper';

type NullStateProps = {
  messageLine1?: string;
  icon?: string;
};

export const NullState = ({
  messageLine1 = 'no result',
  icon = 'noodles',
}: NullStateProps): ReactNode => {
  return (
    <View style={styles.nullResult}>
      <View style={styles.cardContainer}>
        <Icon source={icon} size={40} />
        <Text style={styles.message}>{messageLine1}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
  },
  message: {
    marginTop: 12,
    textAlign: 'center',
  },
  nullResult: {
    paddingTop: 22,
  },
});

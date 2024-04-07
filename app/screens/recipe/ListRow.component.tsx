import {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ListRowProps = {
  orderedList: boolean;
  index: number;
  text: string;
};

export const ListRow = ({
  text,
  orderedList,
  index,
}: ListRowProps): ReactNode => {
  return (
    <View style={styles.rowContainer}>
      {orderedList ? (
        <Text>{`${index + 1}.`}</Text>
      ) : (
        <Icon name="circle-small" size={20} color={'black'} />
      )}
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
  },
});

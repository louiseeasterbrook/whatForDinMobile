import {ReactNode} from 'react';
import {StyleSheet, TextBase, View} from 'react-native';
import {Checkbox, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ListRowProps = {
  orderedList: boolean;
  index: number;
  text: string;
  chefMode: boolean;
  checked: boolean;
  textSize: number;
};

export const ListRow = ({
  text,
  orderedList,
  index,
  chefMode,
  checked,
  textSize,
}: ListRowProps): ReactNode => {
  return (
    <View style={styles(textSize).rowContainer}>
      {chefMode ? (
        <Checkbox status={checked ? 'checked' : 'unchecked'} />
      ) : orderedList ? (
        <Text>{`${index + 1}.   `}</Text>
      ) : (
        <Icon name="circle-small" size={20} color={'black'} />
      )}
      <Text style={styles(textSize).wrapContainer}>{text}</Text>
    </View>
  );
};

const styles = (textSize: number) =>
  StyleSheet.create({
    rowContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    wrapContainer: {
      flex: 1,
      flexWrap: 'wrap',
      fontSize: textSize || 10,
      fontFamily: 'Quicksand-Regular',
    },
  });

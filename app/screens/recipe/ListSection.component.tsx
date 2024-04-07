import {ReactNode} from 'react';
import {Text} from 'react-native-paper';
import {ListWithTitle} from '../../models/searchResults';
import {ListRow} from './ListRow.component';
import {StyleSheet} from 'react-native';

type ListSectionProps = {
  listTitleArray: ListWithTitle;
  orderedList: boolean;
};

export const ListSection = ({
  listTitleArray,
  orderedList,
}: ListSectionProps): ReactNode => {
  return (
    <>
      {listTitleArray?.Title && (
        <Text style={styles.title}>{listTitleArray.Title}</Text>
      )}
      {listTitleArray?.List?.length &&
        listTitleArray.List.map((text: string, index: number) => (
          <ListRow
            key={index}
            text={text}
            orderedList={orderedList}
            index={index}></ListRow>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    paddingBottom: 8,
  },
});

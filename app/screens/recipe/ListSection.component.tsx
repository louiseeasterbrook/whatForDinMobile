import {ReactNode} from 'react';
import {Text} from 'react-native-paper';
import {ListWithTitle} from '../../models/searchResults';
import {ListRow} from './ListRow.component';
import {StyleSheet} from 'react-native';
import {PrimaryText} from '../../components/PrimaryText.component';

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
        <PrimaryText addedStyles={styles.title} text={listTitleArray.Title} />
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
    paddingBottom: 8,
  },
});

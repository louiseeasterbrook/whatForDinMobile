import {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {ListRow} from './ListRow.component';
import {Text} from 'react-native-paper';

type DisplayListWithTitleProps = {
  title: string;
  orderedList: boolean;
  listSteps: string[];
};

export const DisplayListWithTitle = ({
  title,
  orderedList,
  listSteps,
}: DisplayListWithTitleProps): ReactNode => {
  return (
    <>
      <Text style={styles.mainTitle}>{title}</Text>
      {listSteps?.length &&
        listSteps.map((text: string, index: number) => (
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
  mainTitle: {
    fontWeight: '700',
    paddingBottom: 8,
    fontSize: 18,
  },
});

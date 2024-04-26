import {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {ListRow} from './ListRow.component';

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
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 8,
  },
});

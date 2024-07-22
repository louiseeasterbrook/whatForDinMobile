import {ReactNode, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ListRow} from './ListRow.component';
import {Text} from 'react-native-paper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

type DisplayListWithTitleProps = {
  title: string;
  orderedList: boolean;
  listSteps: string[];
  chefMode: boolean;
  textSize: number;
};

export const DisplayListWithTitle = ({
  title,
  orderedList,
  listSteps,
  chefMode,
  textSize,
}: DisplayListWithTitleProps): ReactNode => {
  const getArrayOfListLength = (): boolean[] => {
    const array = [];
    for (let i = 0; i < listSteps.length; i++) {
      array.push(false);
    }
    return array;
  };

  const [checkBoxArray, setCheckBoxArray] = useState<boolean[]>(
    getArrayOfListLength(),
  );

  const setInputValue = (index: number): void => {
    checkBoxArray[index] = !checkBoxArray[index];
    setCheckBoxArray([...checkBoxArray]);
  };

  return (
    <>
      <Text style={styles.mainTitle}>{title}</Text>
      {listSteps?.length &&
        listSteps.map((text: string, index: number) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => setInputValue(index)}>
            <ListRow
              key={index}
              text={text}
              orderedList={orderedList}
              chefMode={chefMode}
              checked={checkBoxArray[index]}
              textSize={textSize}
              index={index}></ListRow>
          </TouchableWithoutFeedback>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontWeight: '700',
    paddingBottom: 8,
  },
});

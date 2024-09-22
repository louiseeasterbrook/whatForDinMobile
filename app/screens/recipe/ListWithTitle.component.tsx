import {ReactNode, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ListRow} from './ListRow.component';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {PrimaryText} from '../../components/PrimaryText.component';

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
      {title && (
        <PrimaryText
          size={textSize}
          addedStyles={styles.mainTitle}
          bold
          text={title}
        />
      )}
      {listSteps?.length > 0 &&
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
              index={index}
              textSize={textSize}></ListRow>
          </TouchableWithoutFeedback>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    paddingBottom: 8,
  },
});

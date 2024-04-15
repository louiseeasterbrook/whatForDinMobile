import {ReactNode, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp} from '@react-navigation/native';
import {ListWithTitle, Recipe} from '../../models/searchResults';
import {FlatList} from 'react-native-gesture-handler';
import {ListSection} from './ListSection.component';
import {Avatar, Button, Card, Text, Appbar} from 'react-native-paper';
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
      <Card>
        <Card.Title title={title}></Card.Title>
        <Card.Content>
          {/* <Text style={styles.mainTitle}>{title}</Text> */}
          {listSteps?.length &&
            listSteps.map((text: string, index: number) => (
              <ListRow
                key={index}
                text={text}
                orderedList={orderedList}
                index={index}></ListRow>
            ))}
        </Card.Content>
      </Card>
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

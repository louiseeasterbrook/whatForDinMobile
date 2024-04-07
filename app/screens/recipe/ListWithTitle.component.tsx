import {ReactNode, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp} from '@react-navigation/native';
import {ListWithTitle, Recipe} from '../../models/searchResults';
import {FlatList} from 'react-native-gesture-handler';
import {ListSection} from './ListSection.component';
import {Avatar, Button, Card, Text, Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';

type DisplayListWithTitleProps = {
  title: string;
  orderedList: boolean;
  listArray: ListWithTitle[];
};

export const DisplayListWithTitle = ({
  title,
  orderedList,
  listArray,
}: DisplayListWithTitleProps): ReactNode => {
  return (
    <>
      <Card>
        <Card.Title title={title}></Card.Title>
        <Card.Content>
          {/* <Text style={styles.mainTitle}>{title}</Text> */}
          {listArray.map((list: ListWithTitle, index: number) => (
            <ListSection
              key={index}
              listTitleArray={list}
              orderedList={orderedList}></ListSection>
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

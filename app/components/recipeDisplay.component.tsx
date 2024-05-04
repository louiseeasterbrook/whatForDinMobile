import {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {DisplayListWithTitle} from '../screens/recipe/ListWithTitle.component';
import {HeaderCard} from './headerCard.component';
import {Divider, Text} from 'react-native-paper';

type RecipeDisplayProps = {
  ingredients: string[];
  steps: string[];
  userName: string;
  recipeName: string;
  comments: string;
};

export const RecipeDisplay = ({
  ingredients,
  steps,
  userName,
  recipeName,
  comments,
}: RecipeDisplayProps): ReactNode => {
  return (
    <>
      <View style={styles.cardContainer}>
        <HeaderCard title={recipeName} subtitle={userName}></HeaderCard>
      </View>
      <Divider />
      <View style={styles.cardContainer}>
        <DisplayListWithTitle
          title="Ingredients"
          orderedList={false}
          listSteps={ingredients}></DisplayListWithTitle>
      </View>
      <View style={styles.cardContainer}>
        <DisplayListWithTitle
          title="Method"
          orderedList={true}
          listSteps={steps}></DisplayListWithTitle>
      </View>
      {comments && (
        <View>
          <Text style={styles.mainTitle}>Comments</Text>
          <Text>{comments}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 16,
  },
  mainTitle: {
    fontWeight: '700',
    paddingBottom: 8,
  },
});

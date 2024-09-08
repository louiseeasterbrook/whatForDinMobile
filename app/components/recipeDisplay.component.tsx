import {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {DisplayListWithTitle} from '../screens/recipe/ListWithTitle.component';
import {HeaderCard} from './headerCard.component';
import {Divider, Text} from 'react-native-paper';
import {ImageSlider} from '../screens/recipe/ImageSlider.component';

type RecipeDisplayProps = {
  ingredients: string[];
  steps: string[];
  userName: string;
  recipeName: string;
  comments: string;
  chefMode?: boolean;
  textSize?: number;
  imageArray?: string[];
};

export const RecipeDisplay = ({
  ingredients,
  steps,
  userName,
  recipeName,
  comments,
  textSize = 14,
  chefMode = false,
  imageArray = [],
}: RecipeDisplayProps): ReactNode => {
  return (
    <View style={styles.fullContainer}>
      <View style={[styles.cardContainer, styles.horizontalPadding]}>
        <HeaderCard title={recipeName} subtitle={userName}></HeaderCard>
      </View>
      <Divider />
      {imageArray?.length > 0 && (
        <ImageSlider images={imageArray}></ImageSlider>
      )}
      <View style={styles.horizontalPadding}>
        <View style={styles.cardContainer}>
          <DisplayListWithTitle
            textSize={textSize}
            title="Ingredients"
            orderedList={false}
            listSteps={ingredients}
            chefMode={chefMode}></DisplayListWithTitle>
        </View>
        <View style={styles.cardContainer}>
          <DisplayListWithTitle
            textSize={textSize}
            title="Method"
            orderedList={true}
            listSteps={steps}
            chefMode={chefMode}></DisplayListWithTitle>
        </View>
        {comments && (
          <View>
            <Text style={styles.mainTitle}>Comments</Text>
            <Text>{comments}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 16,
  },
  mainTitle: {
    paddingBottom: 8,
    fontFamily: 'Quicksand-SemiBold',
  },
  fullContainer: {
    paddingBottom: 20,
  },
  horizontalPadding: {
    paddingHorizontal: 15,
  },
});

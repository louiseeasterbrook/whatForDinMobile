import {ReactNode, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DisplayListWithTitle} from '../screens/recipe/ListWithTitle.component';
import {HeaderCard} from './headerCard.component';
import {Divider} from 'react-native-paper';
import {ImageSlider} from '../screens/recipe/ImageSlider.component';
import {PrimaryText} from './PrimaryText.component';

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
  chefMode = false,
  imageArray = [],
}: RecipeDisplayProps): ReactNode => {
  const [textSize, setTextSize] = useState<number>(14);

  const minusTextSize = (): void => {
    const calcValue = textSize - 2;
    if (calcValue <= 12) {
      return;
    }

    setTextSize(calcValue);
  };

  const plusTextSize = (): void => {
    const calcValue = textSize + 2;
    if (calcValue >= 24) {
      return;
    }

    setTextSize(calcValue);
  };
  return (
    <View style={styles.fullContainer}>
      <View style={[styles.cardContainer, styles.horizontalPadding]}>
        <HeaderCard title={recipeName} subtitle={userName}></HeaderCard>
        {/* <View style={styles.textChangeContainer}>
          <IconButton icon="plus" size={26} onPress={plusTextSize} />
          <IconButton icon="minus" size={26} onPress={minusTextSize} />
        </View> */}
      </View>
      <Divider />
      {imageArray?.length > 0 && (
        <ImageSlider images={imageArray}></ImageSlider>
      )}
      <View style={styles.horizontalPadding}>
        <View style={styles.cardContainer}>
          {ingredients && (
            <DisplayListWithTitle
              textSize={textSize}
              title="Ingredients"
              orderedList={false}
              listSteps={ingredients}
              chefMode={chefMode}></DisplayListWithTitle>
          )}
        </View>
        {steps && (
          <View style={styles.cardContainer}>
            <DisplayListWithTitle
              textSize={textSize}
              title="Method"
              orderedList={true}
              listSteps={steps}
              chefMode={chefMode}></DisplayListWithTitle>
          </View>
        )}
        {comments && (
          <View>
            <PrimaryText addedStyles={styles.mainTitle} bold text="Comments" />
            <PrimaryText text={comments} />
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
  },
  fullContainer: {
    paddingBottom: 20,
  },
  horizontalPadding: {
    paddingHorizontal: 15,
  },
  textChangeContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E9E9E9',
    borderRadius: 8,
    marginTop: 12,
  },
});

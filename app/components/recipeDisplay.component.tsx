import {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {DisplayListWithTitle} from '../screens/recipe/ListWithTitle.component';
import {HeaderCard} from './headerCard.component';
import {Divider} from 'react-native-paper';
import {ImageSlider} from '../screens/recipe/ImageSlider.component';
import {PrimaryText} from './PrimaryText.component';
import {FlatList} from 'react-native-gesture-handler';
import {Tag} from './Tag.component';
import {RecipeTag} from '../models/searchResults';

type RecipeDisplayProps = {
  ingredients: string[];
  steps: string[];
  userName: string;
  recipeName: string;
  comments: string;
  chefMode?: boolean;
  imageArray?: string[];
  tags: RecipeTag[];
  fontSize?: number;
};

export const RecipeDisplay = ({
  ingredients,
  steps,
  userName,
  recipeName,
  comments,
  tags,
  fontSize = 14,
  chefMode = false,
  imageArray = [],
}: RecipeDisplayProps): ReactNode => {
  return (
    <View style={styles.fullContainer}>
      <View style={[styles.cardContainer, styles.horizontalPadding]}>
        <HeaderCard title={recipeName} subtitle={userName}></HeaderCard>
      </View>
      <Divider />
      {Boolean(tags?.length) && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={styles.tags}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          data={tags}
          ItemSeparatorComponent={() => <View style={{marginRight: 16}} />}
          contentContainerStyle={{
            paddingHorizontal: 18,
            paddingBottom: 12,
            marginTop: 10,
          }}
          renderItem={item => {
            return (
              <Tag
                title={item.item.Title}
                colour={item.item.Colour}
                icon={item.item.Icon}
              />
            );
          }}
        />
      )}
      {Boolean(imageArray?.length) && (
        <ImageSlider images={imageArray}></ImageSlider>
      )}

      <View style={styles.horizontalPadding}>
        <View style={styles.cardContainer}>
          {ingredients && (
            <DisplayListWithTitle
              textSize={fontSize}
              title="Ingredients"
              orderedList={false}
              listSteps={ingredients}
              chefMode={chefMode}></DisplayListWithTitle>
          )}
        </View>
        {!!steps && (
          <View style={styles.cardContainer}>
            <DisplayListWithTitle
              textSize={fontSize}
              title="Method"
              orderedList={true}
              listSteps={steps}
              chefMode={chefMode}></DisplayListWithTitle>
          </View>
        )}
        {!!comments && (
          <View>
            <PrimaryText
              size={fontSize}
              addedStyles={styles.mainTitle}
              bold
              text="Comments"
            />
            <PrimaryText size={fontSize} text={comments} />
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
  tags: {
    // marginBottom: 10,
  },
});

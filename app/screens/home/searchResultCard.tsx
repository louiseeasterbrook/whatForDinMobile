import {ReactNode} from 'react';
import {Text, Divider} from 'react-native-paper';
import {Recipe} from '../../models/searchResults';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {PrimaryText} from '../../components/PrimaryText.component';

type SearchResultCardProps = {
  recipe: Recipe;
  onPress: (item: Recipe) => void;
};

export const SearchResultCard = ({
  recipe,
  onPress,
}: SearchResultCardProps): ReactNode => {
  return (
    <TouchableOpacity onPress={() => onPress(recipe)}>
      <View style={styles.main}>
        <PrimaryText text={recipe.Name}></PrimaryText>
      </View>
      <Divider></Divider>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingVertical: 20,
  },
});

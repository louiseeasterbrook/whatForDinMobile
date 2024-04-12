import {ReactNode} from 'react';
import {Text, Divider} from 'react-native-paper';
import {Recipe} from '../../models/searchResults';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';

type SearchResultCardProps = {
  recipe: Recipe;
  category: string;
  onPress: (item: Recipe) => void;
};

export const SearchResultCard = ({
  recipe,
  category,
  onPress,
}: SearchResultCardProps): ReactNode => {
  return (
    <TouchableOpacity onPress={() => onPress(recipe)}>
      <View style={styles.main}>
        <Text>{recipe.Name}</Text>
        <Text variant="bodyMedium">{category}</Text>
      </View>
      <Divider></Divider>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingVertical: 10,
  },
});

import {ReactNode} from 'react';
import {Card, Text} from 'react-native-paper';
import {Recipe} from '../../models/searchResults';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
      <Card>
        <Card.Content>
          <Text>{recipe.Name}</Text>
          <Text variant="bodyMedium">{category}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

import {ReactNode} from 'react';
import {Divider, Icon} from 'react-native-paper';
import {Recipe} from '../../models/searchResults';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {PrimaryText} from '../../components/PrimaryText.component';

type SearchResultCardProps = {
  userId?: string;
  recipe: Recipe;
  onPress: (item: Recipe) => void;
};

export const SearchResultCard = ({
  userId = null,
  recipe,
  onPress,
}: SearchResultCardProps): ReactNode => {
  return (
    <TouchableOpacity onPress={() => onPress(recipe)}>
      <View style={styles.main}>
        <PrimaryText text={recipe.Name}></PrimaryText>
        {userId && userId !== recipe.UserId && (
          <Icon source={'bookmark'} size={20} color="grey" />
        )}
      </View>
      <Divider></Divider>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingVertical: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

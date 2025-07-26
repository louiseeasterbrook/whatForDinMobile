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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginRight: 8, backgroundColor:'rgba(255, 255, 255, 0.2)', borderRadius: 12, padding: 8}}>
      <PrimaryText text={'🌮'}></PrimaryText>
      </View>
        <PrimaryText text={recipe.Name} textColour='white'></PrimaryText>
        </View>
        {userId && userId !== recipe.UserId && (
          <Icon source={'bookmark'} size={20} color="grey" />
        )}
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {

    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor:'rgba(255, 255, 255, 0.2)',
    paddingVertical:12,
    paddingHorizontal: 12,
    borderRadius:12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 14,
  },
});

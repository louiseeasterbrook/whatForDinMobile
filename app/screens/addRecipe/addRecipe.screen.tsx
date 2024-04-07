import {NavigationProp} from '@react-navigation/native';
import {Recipe, UserFavourites} from '../../models/searchResults';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Button, Card, Text, Appbar, FAB} from 'react-native-paper';
import {useStores} from '../../store/mainStore';

import {observer} from 'mobx-react-lite';
import {UpdateUserFavourites} from '../../services/database.service';

type AddRecipeScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const AddRecipeScreen = observer(
  ({navigation}: AddRecipeScreenProps) => {
    const userStore = useStores();

    const goBack = () => {
      navigation.goBack();
    };

    const updateFav = async (newFavList: number[]): Promise<void> => {
      const initUserData: UserFavourites = {
        Favourites: newFavList,
      };
      await UpdateUserFavourites(userStore.uid, initUserData);
      userStore.setFavourites(newFavList);
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Add Recipe'} />
          <Appbar.Action icon="pencil" onPress={() => console.log('edit')} />
        </Appbar.Header>

        <ScrollView style={styles.main}>
          <></>
        </ScrollView>
      </>
    );
  },
);

const styles = StyleSheet.create({
  main: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  cardContainer: {
    paddingVertical: 10,
  },
});

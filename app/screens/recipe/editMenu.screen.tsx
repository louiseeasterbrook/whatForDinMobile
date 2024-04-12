import {NavigationProp} from '@react-navigation/native';
import {Recipe, UserFavourites} from '../../models/searchResults';
import {ScrollView} from 'react-native-gesture-handler';
import {DisplayListWithTitle} from './ListWithTitle.component';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Avatar, Button, Card, Text, Appbar, FAB} from 'react-native-paper';
import {useStores} from '../../store/mainStore';

import {observer} from 'mobx-react-lite';
import {UpdateUserFavourites} from '../../services/database.service';

type EditMenuScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const EditMenuScreen = observer(
  ({navigation, route}: EditMenuScreenProps) => {
    const userStore = useStores();

    const goBack = () => {
      navigation.goBack();
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Edit Recipe'} />
        </Appbar.Header>

        <ScrollView style={styles.main}>
          <>
            <TouchableOpacity onPress={() => navigation.navigate('EditName')}>
              <Card>
                <Card.Content>
                  <Text variant="titleLarge">Name</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditIngredients')}>
              <Card>
                <Card.Content>
                  <Text variant="titleLarge">Ingredients</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditSteps')}>
              <Card>
                <Card.Content>
                  <Text variant="titleLarge">Steps</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </>
        </ScrollView>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('ReviewEdit')}>
          Review Changes
        </Button>
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

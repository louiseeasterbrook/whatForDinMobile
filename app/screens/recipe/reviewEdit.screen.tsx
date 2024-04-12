import {NavigationProp} from '@react-navigation/native';
import {Recipe, UserFavourites} from '../../models/searchResults';
import {ScrollView} from 'react-native-gesture-handler';
import {DisplayListWithTitle} from './ListWithTitle.component';
import {StyleSheet, View} from 'react-native';
import {Avatar, Button, Card, Text, Appbar, FAB} from 'react-native-paper';
import {useStores} from '../../store/mainStore';

import {observer} from 'mobx-react-lite';
import {UpdateUserFavourites} from '../../services/database.service';

type ReviewEditScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const ReviewEditScreen = observer(
  ({navigation, route}: ReviewEditScreenProps) => {
    const userStore = useStores();

    const goBack = () => {
      navigation.goBack();
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Review Recipe'} />
        </Appbar.Header>

        <ScrollView style={styles.main}>
          <>
            <Button mode="contained" onPress={() => navigation.popToTop()}>
              Save Changes
            </Button>
          </>
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

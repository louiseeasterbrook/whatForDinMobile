import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Card, Text, Appbar} from 'react-native-paper';
import {useStores} from '../../store/mainStore';

import {observer} from 'mobx-react-lite';
import {BaseScreen} from '../../components/BaseScreen.component';

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

        <BaseScreen>
          <View style={styles.mainContainer}>
            <ScrollView>
              <>
                <TouchableOpacity
                  style={styles.cardContainer}
                  onPress={() => navigation.navigate('EditName')}>
                  <Card>
                    <Card.Content>
                      <Text>Name</Text>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cardContainer}
                  onPress={() => navigation.navigate('EditIngredients')}>
                  <Card>
                    <Card.Content>
                      <Text>Ingredients</Text>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cardContainer}
                  onPress={() => navigation.navigate('EditSteps')}>
                  <Card>
                    <Card.Content>
                      <Text>Steps</Text>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={styles.cardContainer}
                  onPress={() => navigation.navigate('EditSteps')}>
                  <Card>
                    <Card.Content>
                      <Text>Categories</Text>
                    </Card.Content>
                  </Card>
                </TouchableOpacity> */}
              </>
            </ScrollView>

            <Button
              mode="contained"
              onPress={() => navigation.navigate('ReviewEdit')}>
              Review Changes
            </Button>
          </View>
        </BaseScreen>
      </>
    );
  },
);

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 26,
  },
  cardContainer: {
    paddingTop: 10,
  },
});

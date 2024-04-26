import {NavigationProp} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Appbar, Checkbox} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './context/addRecipeProvider';
import {useState, version} from 'react';
import {CATEGORIES} from '../../index/constants';
import {BaseScreen} from '../../components/BaseScreen.component';

type AddRecipeCategoryScreenProps = {
  navigation: NavigationProp<any, any>;
};

interface CheckBoxData {
  name: string;
  checked: CheckBoxState;
  id: number;
}

enum CheckBoxState {
  checked = 'checked',
  unchecked = 'unchecked',
}

export const AddRecipeCategoryScreen = observer(
  ({navigation}: AddRecipeCategoryScreenProps) => {
    const getCheckBoxData = (): CheckBoxData[] => {
      return CATEGORIES.map((categ: string, index: number) => ({
        name: categ,
        checked: CheckBoxState.unchecked,
        id: index,
      }));
    };

    const {category, setCategory} = useAddRecipe();
    const [categoryData, setCategoryData] = useState<CheckBoxData[]>(
      getCheckBoxData(),
    );

    const goBack = (): void => {
      navigation.goBack();
    };

    const navToStepsScreen = (): void => {
      setCategory(getSelectedCategoryString());
      navigation.navigate('Review');
    };

    const getSelectedCategoryString = (): string[] => {
      return categoryData.reduce((acc: string[], curr: CheckBoxData) => {
        if (curr.checked == CheckBoxState.checked) {
          acc.push(curr.name);
        }
        return acc;
      }, []);
    };

    const checkBoxPressed = (id: number): void => {
      const index = categoryData.findIndex(
        (cat: CheckBoxData) => cat.id === id,
      );

      if (index >= 0) {
        const currentState = categoryData[index].checked;
        const newState =
          currentState === CheckBoxState.checked
            ? CheckBoxState.unchecked
            : CheckBoxState.checked;

        const updatedArray = [...categoryData];
        updatedArray[index].checked = newState;

        setCategoryData(updatedArray);
      }
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Add Recipe'} />
          <Appbar.Action
            icon="close"
            onPress={() => {
              navigation.popToTop();
              navigation.goBack();
            }}
          />
        </Appbar.Header>
        <BaseScreen>
          <View style={styles.main}>
            <View>
              <View style={styles.header}>
                <Text>Select one or more Categories below</Text>
              </View>
              <>
                {categoryData.map(categ => {
                  return (
                    <Checkbox.Item
                      key={categ.id}
                      label={categ.name}
                      status={categ.checked}
                      onPress={() => checkBoxPressed(categ.id)}
                    />
                  );
                })}
              </>
            </View>
            <Button mode="contained" onPress={navToStepsScreen}>
              Next
            </Button>
          </View>
        </BaseScreen>
      </>
    );
  },
);

const styles = StyleSheet.create({
  main: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 26,
  },
  cardContainer: {
    paddingVertical: 10,
  },
  inputButtonContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  input: {
    width: '90%',
  },
  inputRemoveButton: {
    width: '10%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingVertical: 12,
  },
});

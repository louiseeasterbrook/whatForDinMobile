import {NavigationProp} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Button, Appbar, TextInput, Portal, Dialog} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './context/addRecipeProvider';
import {useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen.component';
import {PrimaryButton} from '../../components/PrimaryButton.component';
import {sharedStyles} from '../../index/theme';
import {PrimaryText} from '../../components/PrimaryText.component';
import {SharedDialog} from '../../components/sharedDialog.component';

type AddRecipeCommentScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const AddRecipeCommentScreen = observer(
  ({navigation}: AddRecipeCommentScreenProps) => {
    const {
      comment,
      setComment,
      exitFlowFullBack,
      showExitDialog,
      closeExitDialog,
      openExitDialog,
    } = useAddRecipe();
    const [input, setInput] = useState<string>(comment);

    const goBack = (): void => {
      setComment(input);
      navigation.goBack();
    };

    const navToStepsScreen = (): void => {
      setComment(input);
      navigation.navigate('AddImage');
    };

    return (
      <>
        <Appbar.Header style={sharedStyles.appBar} elevated={true}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Add Recipe'} />
          <Appbar.Action icon="close" onPress={() => openExitDialog()} />
        </Appbar.Header>
        <BaseScreen>
          <View style={styles.main}>
            <View>
              <View style={styles.header}>
                <PrimaryText text="Add a comment to your recipe" />
              </View>
              <TextInput
                multiline
                numberOfLines={2}
                placeholder="Add comment..."
                value={input}
                onChangeText={setInput}
                autoFocus
              />
            </View>

            <PrimaryButton
              text="Next"
              onPress={navToStepsScreen}></PrimaryButton>
          </View>
        </BaseScreen>
        <Portal>
          <SharedDialog
            showDialog={showExitDialog}
            exitDialog={() => closeExitDialog()}
            text={'Are you sure you want to exit the create recipe flow?'}
            leftButton="Cancel"
            rightButton="Yes, exit"
            leftButtonPress={() => closeExitDialog()}
            rightButtonPress={() => exitFlowFullBack()}></SharedDialog>
        </Portal>
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
  header: {
    paddingVertical: 12,
  },
});

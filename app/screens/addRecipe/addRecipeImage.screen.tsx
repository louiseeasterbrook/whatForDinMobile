import {NavigationProp} from '@react-navigation/native';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Button, Text, Appbar, Portal, Dialog, Icon} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './context/addRecipeProvider';
import {useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen.component';
import {PrimaryButton} from '../../components/PrimaryButton.component';
import {light_red, sharedStyles} from '../../index/theme';
import {openImagePicker} from '../../services/imagePicker.service';

type AddRecipeImageScreenProps = {
  navigation: NavigationProp<any, any>;
};

export interface PhotoData {
  uri: string;
  fileName: string;
}

export const AddRecipeImageScreen = observer(
  ({navigation}: AddRecipeImageScreenProps) => {
    const [uploadedPhoto, setUploadedPhoto] = useState<PhotoData>();
    const {
      setImageData,
      exitFlowFullBack,
      showExitDialog,
      closeExitDialog,
      openExitDialog,
    } = useAddRecipe();

    const goBack = (): void => {
      navigation.goBack();
    };

    const navToStepsScreen = (): void => {
      setImageData(uploadedPhoto);
      navigation.navigate('Review');
    };

    const selectImage = async () => {
      const result = await openImagePicker();
      setUploadedPhoto(result);
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
                <Text>Add an image to your recipe</Text>
              </View>
              <PrimaryButton
                text="Select Image"
                disabled={Boolean(uploadedPhoto?.uri)}
                onPress={selectImage}></PrimaryButton>

              {uploadedPhoto?.uri && (
                <>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{uri: uploadedPhoto.uri}}
                      style={styles.image}
                    />

                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => setUploadedPhoto(null)}>
                      <Icon source="minus-circle-outline" size={20} />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>

            <PrimaryButton
              text="Next"
              onPress={navToStepsScreen}></PrimaryButton>
          </View>
        </BaseScreen>
        <Portal>
          <Dialog visible={showExitDialog} onDismiss={() => closeExitDialog()}>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Are you sure you want to exit the create recipe flow?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => closeExitDialog()}>Cancel</Button>
              <Button onPress={() => exitFlowFullBack()}>Yes, exit</Button>
            </Dialog.Actions>
          </Dialog>
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
  image: {
    marginTop: 20,
    width: '80%',
    aspectRatio: 3 / 2,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  removeButton: {
    zIndex: 1,
    backgroundColor: light_red,
    padding: 16,
    borderRadius: 8,
  },
});

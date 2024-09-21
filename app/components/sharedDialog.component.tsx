import {Button, Dialog} from 'react-native-paper';
import {PrimaryText} from './PrimaryText.component';

type SharedDialogProps = {
  showDialog: boolean;
  text: string;
  leftButton: string;
  rightButton: string;
  leftButtonPress: () => void;
  rightButtonPress: () => void;
  exitDialog: () => void;
};

export const SharedDialog = ({
  showDialog = false,
  text,
  leftButton,
  rightButton,
  leftButtonPress,
  rightButtonPress,
  exitDialog,
}: SharedDialogProps) => {
  return (
    <Dialog visible={showDialog} onDismiss={exitDialog}>
      <Dialog.Content>{text && <PrimaryText text={text} />}</Dialog.Content>
      <Dialog.Actions>
        {leftButton && <Button onPress={leftButtonPress}>{leftButton}</Button>}
        {rightButton && (
          <Button onPress={rightButtonPress}>{rightButton}</Button>
        )}
      </Dialog.Actions>
    </Dialog>
  );
};

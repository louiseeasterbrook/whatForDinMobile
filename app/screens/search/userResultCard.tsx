import {ReactNode} from 'react';
import {Divider, Avatar} from 'react-native-paper';
import {SearchResultUser} from '../../models/searchResults';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {PrimaryText} from '../../components/PrimaryText.component';

type UserResultCardProps = {
  user: SearchResultUser;
  onPress: (Id: string) => void;
};

export const UserResultCard = ({
  user,
  onPress,
}: UserResultCardProps): ReactNode => {
  return (
    <TouchableOpacity onPress={() => onPress(user.Id)}>
      <View style={styles.main}>
        <View style={styles.iconStyle}>
          <Avatar.Icon size={34} icon="account" />
        </View>
        <View>
          <PrimaryText text={user.Name} />
          <PrimaryText
            textColour="grey"
            text={`${user.RecipeCount || 0} Recipes`}
          />
        </View>
      </View>
      <Divider></Divider>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
  },
  iconStyle: {
    paddingRight: 20,
  },
});

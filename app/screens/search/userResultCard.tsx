import {ReactNode, useEffect} from 'react';
import {Text, Divider, Avatar} from 'react-native-paper';
import {Recipe, SearchResultUser} from '../../models/searchResults';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';

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
          <Text>{user.Name}</Text>
          <Text variant="bodyMedium">{`${user.RecipeCount || 0} Recipes`}</Text>
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

import {ReactNode} from 'react';
import {Text, Divider, Avatar} from 'react-native-paper';
import {Recipe} from '../../models/searchResults';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';

type UserResultCardProps = {
  name: string;
  onPress: () => void;
};

export const UserResultCard = ({
  name,
  onPress,
}: UserResultCardProps): ReactNode => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.main}>
        <View style={styles.iconStyle}>
          <Avatar.Icon size={34} icon="account" />
        </View>
        <View>
          <Text>{name}</Text>
          <Text variant="bodyMedium">{'0 Recipes'}</Text>
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

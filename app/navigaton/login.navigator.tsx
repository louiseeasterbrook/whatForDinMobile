import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/login/login.screen';
import {HORIZONTAL_ANIMATION} from './navigation.animation';

const Stack = createStackNavigator();

export default function LoginNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={HORIZONTAL_ANIMATION}
      />
    </Stack.Navigator>
  );
}

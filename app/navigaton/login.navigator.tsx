import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/login/login.screen';

const Stack = createStackNavigator();

export default function LoginNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

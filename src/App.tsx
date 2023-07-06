import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './Home';
import ImageComponent from './ImageComponent';
import PasswordComponent from './PasswordComponent';
import { ServiceProvider } from './ServiceProvider';
import ShowAllComponent from './ShowAllComponent';
import GenerateOneTimePassword from './GenerateOneTimePassword';

const Stack = createNativeStackNavigator();

function Navigation(): JSX.Element {
  return (
    <NavigationContainer>
      <ServiceProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Loony'}}
          />
          <Stack.Screen name="PasswordComponent" component={PasswordComponent} options={{title: 'Encrypt Password'}} />
          <Stack.Screen name="ImageComponent" component={ImageComponent} options={{title: 'Encrypt Image'}} />
          <Stack.Screen name="ShowAllComponent" component={ShowAllComponent} options={{title: 'View All Password'}} />
          <Stack.Screen name="GenerateOneTimePassword" component={GenerateOneTimePassword} options={{title: 'Generate One Time Password'}} />

        </Stack.Navigator>
      </ServiceProvider>
    </NavigationContainer>
  );
}


export default Navigation;

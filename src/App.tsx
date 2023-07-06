import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './Home';
import ViewPasswords from './ViewPasswords';
import ImageComponent from './ImageComponent';
import PasswordComponent from './PasswordComponent';
import { ServiceProvider } from './ServiceProvider';
import ShowAllComponent from './ShowAllComponent';
import GeneratePassword from './GeneratePassword';

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
          <Stack.Screen name="ViewPasswords" component={ViewPasswords} />
          <Stack.Screen name="PasswordComponent" component={PasswordComponent} />
          <Stack.Screen name="ImageComponent" component={ImageComponent} />
          <Stack.Screen name="ShowAllComponent" component={ShowAllComponent} />
          <Stack.Screen name="GeneratePassword" component={GeneratePassword} />

        </Stack.Navigator>
      </ServiceProvider>
    </NavigationContainer>
  );
}


export default Navigation;

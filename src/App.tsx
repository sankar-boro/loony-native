import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './Home';
import ImageComponent from './ImageComponent';
import PasswordComponent from './PasswordComponent';
import { AppContext, ServiceProvider } from './ServiceProvider';
import ShowAllComponent from './ShowAllComponent';
import GenerateOneTimePassword from './GenerateOneTimePassword';
import LoginApp from './LoginApp';
import PermissionsPage from './PermissionsPage';

const Stack = createNativeStackNavigator();

function Navigation(): JSX.Element {
  return (
    <NavigationContainer>
      <ServiceProvider>
      <AppContext.Consumer>
        {({ password }) => {
          if (password.auth === false) {
            return <Stack.Navigator>
              <Stack.Screen 
              name="Login"
              component={LoginApp}
              options={{title: 'Login'}}
              />
              <Stack.Screen name="GenerateOneTimePassword" component={GenerateOneTimePassword} options={{title: 'Generate One Time Password'}} />
            </Stack.Navigator> 
          } else {
            return <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{title: 'Loony'}}
              />
              <Stack.Screen
                name="PermissionsPage"
                component={PermissionsPage}
                options={{title: 'Permissions'}}
              />
              <Stack.Screen name="PasswordComponent" component={PasswordComponent} options={{title: 'Encrypt Password'}} />
              <Stack.Screen name="ImageComponent" component={ImageComponent} options={{title: 'Encrypt Image'}} />
              <Stack.Screen name="ShowAllComponent" component={ShowAllComponent} options={{title: 'View All Password'}} />
            </Stack.Navigator>
          }
        }}
      </AppContext.Consumer>
      </ServiceProvider>
    </NavigationContainer>
  );
}


export default Navigation;

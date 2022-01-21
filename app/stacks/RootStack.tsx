import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {ApplicationContext} from '../context/ApplicationContextProvider';
import OpenedStack from './OpenedStack';
import ProtectedStack from './ProtectedStack';

function RootStack() {
  const Stack = createNativeStackNavigator();
  const {state} = useContext<any>(ApplicationContext);
  const {authenticatedUser} = state;
  return (
      <Stack.Navigator>
        {authenticatedUser ? (
            <Stack.Screen name="Protected" component={ProtectedStack}
                          options={{headerShown: false}}/>
        ) : (
            <Stack.Screen name="Unprotected" component={OpenedStack}
                          options={{headerShown: false}}/>
        )}
      </Stack.Navigator>
  );
}

export default RootStack;

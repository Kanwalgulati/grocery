import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Main from './screens/Main';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import constants from './constants/constants';
const Stack = createNativeStackNavigator();

const {
  Screens: {CART, MAIN, PRODUCT_DETAILS},
} = constants;
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={MAIN}
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={PRODUCT_DETAILS}
          component={ProductDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={CART}
          component={Cart}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

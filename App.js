import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './src/components/Menu';
import Checkout from './src/components/Checkout';
import Cart from './src/components/Cart';
import OrderForm from './src/components/OrderForm';
import { CartProvider } from './src/contexts/CartContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Menu">
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="OrderForm" component={OrderForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Menu from './src/components/Menu';
// import Checkout from './src/components/Checkout';
// import Cart from './src/components/Cart';
// import OrderForm from './src/components/OrderForm';
// import { CartProvider } from './src/contexts/CartContext';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <CartProvider>
//       <NavigationContainer>
//         <Stack.Navigator /*initialRouteName="Menu"*/>
//           <Stack.Screen name="Menu" component={Menu} />
//           <Stack.Screen name="Checkout" component={Checkout} />
//           <Stack.Screen name="Cart" component={Cart} />
//           <Stack.Screen name="OrderForm" component={OrderForm} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </CartProvider>
//   );
// };

// export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
import Menu from './src/components/Menu';
import Checkout from './src/components/Checkout';
import Cart from './src/components/Cart';
import OrderForm from './src/components/OrderForm';
import { CartProvider } from './src/contexts/CartContext';
import Icon from 'react-native-vector-icons/FontAwesome';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MenuStack = () => (
  <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Menu" component={Menu} />
    <Stack.Screen name="Checkout" component={Checkout} />
  </Stack.Navigator>
);

const CartStack = () => (
  <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Cart" component={Cart} />
    <Stack.Screen name="OrderForm" component={OrderForm} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor:'tomato',
            tabBarInactiveTintColor: "gray",
            // headerShown:false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'cutlery' : 'cutlery';
              } else if (route.name === 'Basket') {
                iconName = focused ? 'shopping-cart' : 'list';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={MenuStack} />
          <Tab.Screen name="Basket" component={CartStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;

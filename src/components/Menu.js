import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { Card, Title, Paragraph } from 'react-native-paper';
import CartContext from '../contexts/CartContext';
import Carousel from 'react-native-snap-carousel';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import More from './More';
const Tab = createBottomTabNavigator();

function OrdersScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Orders!</Text>
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

function MoreScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>More!</Text>
    </View>
  );
}
const Menu = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { cart } = useContext(CartContext);
  const [categories,setCategories]= useState()
  console.log('CART IN MENU', cart);
  useEffect(() => {
    axios.get('http://192.168.100.8:3000/api/products')
      .then(response =>{ 
        setProducts(response.data)
        setFilteredProducts(response.data)
        // setCategories(response.data.map(prod=>prod.Category))
        // console.log((response.data.map(prod=>prod.Category)));
        const uniqueCategories = Object.values(response.data.reduce((acc, product) => {
          if (!acc[product.categoryId]) {
            acc[product.Category.name] = { categoryId: product.categoryId,name:product.Category.name, ...product.category };
          }
          return acc;
        }, {}));
        console.log('unique',uniqueCategories);
        setCategories(uniqueCategories)
      })
      .catch(error => console.log(error));
  }, []);
  const filterProducts = (categoryId) => {
    if (categoryId === null) {
      setFilteredProducts(products); // Show all products if no category is selected
    } else {
      console.log('id is', categoryId);
      setFilteredProducts(products.filter(product => product.categoryId === categoryId));
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Checkout', { product: item })}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{item.name}</Title>
          <Paragraph>{item.price}</Paragraph>
          <Text>Category: {item?.Category?.name}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              // style={[styles.categoryItem, selectedCategory === item.id && styles.selectedCategory]}
              style={styles.categoryItem}
              onPress={() =>filterProducts(item.categoryId)}
            >
             { item && <Text >{item.name}</Text>}
            </TouchableOpacity>
          )}
          sliderWidth={400}
          itemWidth={100}
        />
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
      {cart.length > 0 && (
        <TouchableOpacity style={styles.basket} onPress={() => navigation.navigate('Cart')}>
          <Text>Basket: {totalItems} items, Total: ${totalPrice.toFixed(2)}</Text>
        </TouchableOpacity>
      )}
    </View>
    {/* <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'cutlery' : 'cutlery';
            } else if (route.name === 'Orders') {
              iconName = focused ? 'list' : 'list';
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'bell' : 'bell';
            } else if (route.name === 'More') {
              iconName = focused ? 'ellipsis-h' : 'ellipsis-h'
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'brown',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen}/>
        <Tab.Screen name="More" component={More} />
      </Tab.Navigator>
    </NavigationContainer> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginVertical: 10,
  },
  basket: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  carouselContainer: {
    height: 100,
    marginBottom: 20
  },
  categoryItem: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center'
  },
});

export default Menu;

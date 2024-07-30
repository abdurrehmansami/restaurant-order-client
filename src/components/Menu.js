import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { Card, Title, Paragraph } from 'react-native-paper';
import CartContext from '../contexts/CartContext';
import Carousel from 'react-native-snap-carousel';
const Menu = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const { cart } = useContext(CartContext);
  const [categories,setCategories]= useState()
  console.log('CART IN MENU', cart);
  useEffect(() => {
    axios.get('http://192.168.18.143:3000/api/products')
      .then(response =>{ 
        setProducts(response.data)
        setCategories(response.data.map(prod=>prod.Category))
        console.log((response.data.map(prod=>prod.Category)));
      })
      .catch(error => console.log(error));
  }, []);

  const filterProductsByCategory=()=>{}
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
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              // style={[styles.categoryItem, selectedCategory === item.id && styles.selectedCategory]}
              style={styles.categoryItem}
              onPress={() => filterProductsByCategory(item.id)}
            >
             { item && <Text >{item.name}</Text>}
            </TouchableOpacity>
          )}
          sliderWidth={400}
          itemWidth={100}
        />
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
      {cart.length > 0 && (
        <TouchableOpacity style={styles.basket} onPress={() => navigation.navigate('Cart')}>
          <Text>Basket: {totalItems} items, Total: ${totalPrice.toFixed(2)}</Text>
        </TouchableOpacity>
      )}
    </View>
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

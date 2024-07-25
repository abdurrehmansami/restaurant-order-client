import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CartContext from '../contexts/CartContext';

const Checkout = ({ route, navigation }) => {
  const { product } = route.params;
  const { dispatch } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    navigation.navigate('Menu');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <Button title="-" onPress={() => setQuantity(Math.max(1, quantity - 1))} />
        <Text style={styles.quantity}>{quantity}</Text>
        <Button title="+" onPress={() => setQuantity(quantity + 1)} />
      </View>
      <Button title="Add to Basket" onPress={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  productName: {
    fontSize: 24,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 20,
  },
});

export default Checkout;

import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import CartContext from '../contexts/CartContext';

const Cart = ({ navigation }) => {
  const { cart, dispatch } = useContext(CartContext);

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeFromCart = id => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const addTotalPriceTotalCart =(total)=>{

  }
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            <View style={styles.quantityContainer}>
              <Button title="-" onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} />
              <Text style={styles.quantity}>{item.quantity}</Text>
              <Button title="+" onPress={() => updateQuantity(item.id, item.quantity + 1)} />
            </View>
            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
          </View>
        )}
      />
      {cart.length > 0 ?<>
      <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
      
      <Button title="Continue" onPress={() => navigation.navigate('OrderForm')} /></>:
      <Button title="Back To Menu" onPress={() => navigation.navigate('Menu')} />
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  itemName: {
    fontSize: 18,
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 20,
    marginTop: 16,
    textAlign: 'center',
  },
});

export default Cart;

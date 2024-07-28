import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import CartContext from '../contexts/CartContext';

const OrderForm = ({ navigation }) => {
  const { cart, dispatch } = useContext(CartContext);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const handleSubmit = () => {
    const order = {
      customerName,
      customerPhone,
      customerAddress,
      totalAmount:cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      products: cart,
    };

    axios.post('http://192.168.100.8:3000/api/orders', order)
      .then(response => {
        dispatch({ type: 'RESET_CART' });
        navigation.navigate('Menu');
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={customerName}
        onChangeText={setCustomerName}
      />
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={customerPhone}
        onChangeText={setCustomerPhone}
      />
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={customerAddress}
        onChangeText={setCustomerAddress}
      />
      <Button title="Submit Order" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default OrderForm;


import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import products from '../data/products.json';
import { Product } from '../types';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToCart } from '../redux/slices/cartSlice';

const HomeScreen = ({ navigation }: any) => {

  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(
  (state) => state.cart.items
);

const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);
  const renderProduct = ({ item }: { item: Product }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="cover"
        />

        <View style={styles.productInfo}>
          <Text style={styles.category}>{item.category}</Text>

          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>

          <Text style={styles.price}>₹{item.price}</Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              dispatch(addToCart(item));
              console.log('Add to cart:', item.name);
            }}
          >
      <Text style={styles.cartButtonText}>
          Add to Cart
      </Text>          
      </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Store</Text>
          <Text style={styles.subtitle}>Discover our products</Text>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
      <Text style={styles.cartButtonText}>
          🛒 Cart ({cartCount})
      </Text>          
      </TouchableOpacity>
      </View>

      <FlatList
        data={products as Product[]}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        // columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  cartButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cartButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 135,
    backgroundColor: '#E5E7EB',
  },
  productInfo: {
    padding: 10,
  },
  category: {
    fontSize: 11,
    color: '#6B7280',
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#111827',
  },
  description: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 5,
    minHeight: 30,
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
  },
  addButton: {
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 7,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default HomeScreen;

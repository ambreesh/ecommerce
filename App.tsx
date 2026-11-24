
import React, { useEffect, useState } from 'react';

import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import { store } from './src/redux/store';

import AppNavigator from './src/navigation/AppNavigator';

import {
  getSession,
  getCart,
  saveCart,
} from './src/services/storage';

import { loginUser } from './src/redux/slices/authSlice';
import { setCart } from './src/redux/slices/cartSlice';

import { useAppDispatch, useAppSelector } from './src/redux/hooks';


const AppContent = () => {

  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const restoreSession = async () => {

      try {

        const session = await getSession();
        console.log('Session', session);
        if (session) {

          dispatch(loginUser(session));

        }

        const cart = await getCart();
        console.log('Cart', cart);
        if (cart) {

          dispatch(setCart(cart));

        }

      } catch (error) {

        console.log('Session restoration failed:', error);

      } finally {

        setIsLoading(false);

      }

    };

    restoreSession();

  }, [dispatch]);

  useEffect(() => {

    if (!isLoading) {

      const persistCart = async () => {

        try {

          await saveCart(cartItems);

        } catch (error) {

          console.log('Error saving cart:', error);

        }

      };

      persistCart();

    }

  }, [cartItems, isLoading]);


  if (isLoading) {

    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );

  }


  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );

};


const App = () => {

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );

};


const styles = StyleSheet.create({

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});


export default App;

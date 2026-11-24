import AsyncStorage from '@react-native-async-storage/async-storage'

import { CartItem } from '../redux/slices/cartSlice';

const CART_KEY = '@ecommerce_cart';

const USER_KEY = '@ecommerce_user';
export interface StoredUser {
  name: string;
  email:string;
  password: string;
}

export const saveUser = async (user: StoredUser) => {
  try {
    await AsyncStorage.setItem(
      USER_KEY,
      JSON.stringify(user)
    );
  } catch (error) {
    console.log('Error saving user:', error);
    throw error;
  }
};
export const getUser = async (): Promise<StoredUser | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    throw error;
    
  }
}
const SESSION_KEY = '@ecommerce_session';

export interface UserSession {
  name: string;
  email: string;
}

export const saveSession = async (user: UserSession) => {
  try {
    await AsyncStorage.setItem(
      SESSION_KEY,
      JSON.stringify(user)
    );
  } catch (error) {
    console.log('Error saving session:', error);
    throw error;
  }
};

export const getSession = async (): Promise<UserSession | null> => {
  try {
    const session = await AsyncStorage.getItem(SESSION_KEY);

    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.log('Error retrieving session:', error);
    throw error;
  }
};

export const clearSession = async () => {
  try {
    await AsyncStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.log('Error clearing session:', error);
    throw error;
  }
};
export const saveCart = async (items: CartItem[]) => {
  try {
    await AsyncStorage.setItem(
      CART_KEY,
      JSON.stringify(items)
    );
  } catch (error) {
    console.log('Error saving cart:', error);
    throw error;
  }
};

export const getCart = async (): Promise<CartItem[]> => {
  try {
    const cartData = await AsyncStorage.getItem(CART_KEY);

    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.log('Error retrieving cart:', error);
    return [];
  }
};


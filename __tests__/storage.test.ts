import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  saveCart,
  getCart,
  saveSession,
  getSession,
  clearSession,
  saveUser,
  getUser,
} from '../src/services/storage';
import { CartItem } from '../src/redux/slices/cartSlice';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('storage service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('cart storage', () => {
    const mockCartItems: CartItem[] = [
      {
        product: {
          id: '1',
          name: 'Wireless Headphones',
          description: 'High-quality sound with noise cancellation',
          price: 1999,
          category: 'Electronics',
          image: 'https://example.com/headphones.jpg',
        },
        quantity: 2,
      },
    ];

    it('saves cart items to AsyncStorage with @ecommerce_cart key', async () => {
      (AsyncStorage.setItem as jest.Mock).mockResolvedValueOnce(undefined);

      await saveCart(mockCartItems);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@ecommerce_cart',
        JSON.stringify(mockCartItems)
      );
    });

    it('throws an error if saving cart fails', async () => {
      const error = new Error('AsyncStorage error');
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(error);

      await expect(saveCart(mockCartItems)).rejects.toThrow('AsyncStorage error');
    });

    it('retrieves cart items when data exists in AsyncStorage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockCartItems)
      );

      const result = await getCart();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@ecommerce_cart');
      expect(result).toEqual(mockCartItems);
    });

    it('returns an empty array when no cart is saved', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await getCart();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@ecommerce_cart');
      expect(result).toEqual([]);
    });

    it('returns an empty array if retrieving cart fails', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
        new Error('Storage failure')
      );

      const result = await getCart();

      expect(result).toEqual([]);
    });
  });

  describe('session storage', () => {
    const mockSession = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    it('saves user session to AsyncStorage', async () => {
      (AsyncStorage.setItem as jest.Mock).mockResolvedValueOnce(undefined);

      await saveSession(mockSession);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@ecommerce_session',
        JSON.stringify(mockSession)
      );
    });

    it('retrieves user session when it exists', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockSession)
      );

      const result = await getSession();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@ecommerce_session');
      expect(result).toEqual(mockSession);
    });

    it('returns null when no session is stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await getSession();

      expect(result).toBeNull();
    });

    it('throws an error if saving session fails', async () => {
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
        new Error('Failed to save session')
      );

      await expect(saveSession(mockSession)).rejects.toThrow('Failed to save session');
    });

    it('throws an error if retrieving session fails', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
        new Error('Failed to get session')
      );

      await expect(getSession()).rejects.toThrow('Failed to get session');
    });

    it('throws an error if clearing session fails', async () => {
      (AsyncStorage.removeItem as jest.Mock).mockRejectedValueOnce(
        new Error('Failed to clear session')
      );

      await expect(clearSession()).rejects.toThrow('Failed to clear session');
    });

    it('clears session from AsyncStorage', async () => {
      (AsyncStorage.removeItem as jest.Mock).mockResolvedValueOnce(undefined);

      await clearSession();

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@ecommerce_session');
    });
  });

  describe('user registration storage', () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    it('saves registered user to AsyncStorage', async () => {
      (AsyncStorage.setItem as jest.Mock).mockResolvedValueOnce(undefined);

      await saveUser(mockUser);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@ecommerce_user',
        JSON.stringify(mockUser)
      );
    });

    it('retrieves registered user', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockUser)
      );

      const result = await getUser();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@ecommerce_user');
      expect(result).toEqual(mockUser);
    });

    it('throws an error if saving user fails', async () => {
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
        new Error('Failed to save user')
      );

      await expect(saveUser(mockUser)).rejects.toThrow('Failed to save user');
    });

    it('throws an error if retrieving user fails', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
        new Error('Failed to get user')
      );

      await expect(getUser()).rejects.toThrow('Failed to get user');
    });

    it('returns null when no user is found', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await getUser();

      expect(result).toBeNull();
    });
  });
});

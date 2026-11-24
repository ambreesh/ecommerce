import cartReducer, {
  setCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  CartItem,
} from '../src/redux/slices/cartSlice';
import { Product } from '../src/types';

describe('cartSlice reducer & actions', () => {
  const initialCartState = {
    items: [] as CartItem[],
  };

  const sampleProduct1: Product = {
    id: 'prod-1',
    name: 'Wireless Headphones',
    description: 'High-quality sound with noise cancellation',
    price: 1999,
    category: 'Electronics',
    image: 'https://example.com/headphones.jpg',
  };

  const sampleProduct2: Product = {
    id: 'prod-2',
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor',
    price: 2999,
    category: 'Electronics',
    image: 'https://example.com/watch.jpg',
  };

  it('handles initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  describe('setCart', () => {
    it('sets items in cart from stored array', () => {
      const storedItems: CartItem[] = [
        { product: sampleProduct1, quantity: 3 },
      ];

      const state = cartReducer(initialCartState, setCart(storedItems));

      expect(state.items).toEqual(storedItems);
    });

    it('replaces existing items in cart when setCart is called', () => {
      const existingState = {
        items: [{ product: sampleProduct1, quantity: 1 }],
      };
      const newItems: CartItem[] = [
        { product: sampleProduct2, quantity: 2 },
      ];

      const state = cartReducer(existingState, setCart(newItems));

      expect(state.items).toEqual(newItems);
    });
  });

  describe('addToCart', () => {
    it('adds a new product with quantity 1 when not in cart', () => {
      const state = cartReducer(initialCartState, addToCart(sampleProduct1));

      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual({
        product: sampleProduct1,
        quantity: 1,
      });
    });

    it('increments quantity when product already exists in cart', () => {
      const existingState = {
        items: [{ product: sampleProduct1, quantity: 1 }],
      };

      const state = cartReducer(existingState, addToCart(sampleProduct1));

      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
    });
  });

  describe('removeFromCart', () => {
    it('removes item matching the product id', () => {
      const stateWithTwo = {
        items: [
          { product: sampleProduct1, quantity: 2 },
          { product: sampleProduct2, quantity: 1 },
        ],
      };

      const state = cartReducer(stateWithTwo, removeFromCart('prod-1'));

      expect(state.items).toHaveLength(1);
      expect(state.items[0].product.id).toBe('prod-2');
    });
  });

  describe('increaseQuantity', () => {
    it('increments quantity by 1 for the matching product', () => {
      const existingState = {
        items: [{ product: sampleProduct1, quantity: 2 }],
      };

      const state = cartReducer(existingState, increaseQuantity('prod-1'));

      expect(state.items[0].quantity).toBe(3);
    });

    it('does nothing if product is not found', () => {
      const existingState = {
        items: [{ product: sampleProduct1, quantity: 2 }],
      };

      const state = cartReducer(existingState, increaseQuantity('unknown-id'));

      expect(state.items[0].quantity).toBe(2);
    });
  });

  describe('decreaseQuantity', () => {
    it('decrements quantity by 1 if quantity > 1', () => {
      const existingState = {
        items: [{ product: sampleProduct1, quantity: 3 }],
      };

      const state = cartReducer(existingState, decreaseQuantity('prod-1'));

      expect(state.items[0].quantity).toBe(2);
    });

    it('does not decrement quantity below 1', () => {
      const existingState = {
        items: [{ product: sampleProduct1, quantity: 1 }],
      };

      const state = cartReducer(existingState, decreaseQuantity('prod-1'));

      expect(state.items[0].quantity).toBe(1);
    });
  });

  describe('clearCart', () => {
    it('removes all items from the cart', () => {
      const existingState = {
        items: [
          { product: sampleProduct1, quantity: 2 },
          { product: sampleProduct2, quantity: 1 },
        ],
      };

      const state = cartReducer(existingState, clearCart());

      expect(state.items).toEqual([]);
    });
  });
});

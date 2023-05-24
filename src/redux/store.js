import {configureStore} from '@reduxjs/toolkit';
import ProductReducer from './Slices/ProductSlice';
import WishListReducer from './Slices/WishListSlice';
import CartReducer from './Slices/CartSlice';

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    wishlist: WishListReducer,
    cart: CartReducer,
  },
});

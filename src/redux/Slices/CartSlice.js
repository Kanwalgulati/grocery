const {createSlice} = require('@reduxjs/toolkit');

const CartSlice = createSlice({
  name: 'wishlist',
  initialState: {
    data: [],
  },
  reducers: {
    addProductToCart(state, action) {
      let tempData = state.data;
      let isItemAlreadyExist = false;
      tempData.map(_ => {
        if (_.id === action.payload.id) {
          isItemAlreadyExist = true;
          _.qty += 1;
        }
      });
      if (!isItemAlreadyExist) tempData.push(action.payload);
      state.data = tempData;
    },
    reduceProductFromCart(state, action) {
      let tempData = state.data;
      tempData.map(_ => {
        if (_.id === action.payload.id) {
          _.qty -= 1;
        }
      });
      state.data = tempData;
    },

    removeProductFromCart(state, action) {
      let tempData = state.data;
      tempData.splice(action.payload, 1);
      state.data = tempData;
    },
  },
});

export const {addProductToCart, reduceProductFromCart, removeProductFromCart} =
  CartSlice.actions;

export default CartSlice.reducer;

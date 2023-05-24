const {createSlice} = require('@reduxjs/toolkit');

const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    data: [],
  },
  reducers: {
    addProductToWishList(state, action) {
      let tempData = state.data;
      tempData.push(action.payload);
      state.data = tempData;
    },
    removeProductFromWishList(state, action) {
      let tempData = state.data;
      tempData = tempData.filter(({id}) => id != action.payload);
      state.data = tempData;
    },
  },
});

export const {addProductToWishList, removeProductFromWishList} =
  WishlistSlice.actions;

export default WishlistSlice.reducer;

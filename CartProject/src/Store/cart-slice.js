import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {

    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity+=newItem.quantity;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          totalPrice: newItem.totalPrice,
          quantity: newItem.quantity,
          title: newItem.title
        });
      } else {
        existingItem.quantity+=newItem.quantity;
        existingItem.totalPrice = existingItem.totalPrice + newItem.totalPrice;
      }
    },
    removeItemFromCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== existingItem.id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice-=newItem.totalPrice;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
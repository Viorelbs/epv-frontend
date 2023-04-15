import useLocalStorage from "@/hooks/useLocalStorage";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CounterState {
  products: { id: number; qty: number }[];
}

// Define the initial state using that type
const initialState: CounterState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.qty += action.payload.qty;
      } else {
        state.products.push(action.payload);
      }
    },
    updateQty: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.qty = action.payload.qty;
      }
    },
    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetCart: (state, action) => {
      state.products = [];
    },
  },
});

export const { addToCart, removeItem, updateQty, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;

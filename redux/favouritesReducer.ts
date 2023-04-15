import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  products: { id: number }[];
}

// Define the initial state using that type
const initialState: CounterState = {
  products: [],
};

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addFav: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      state.products.push(action.payload);
    },
    removeFav: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addFav, removeFav } = favouriteSlice.actions;

export default favouriteSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const CartOpenSlice = createSlice({
  name: "cartOpen",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.open = action.payload.open;
    },
  },
});

export const { setCart } = CartOpenSlice.actions;

export default CartOpenSlice.reducer;

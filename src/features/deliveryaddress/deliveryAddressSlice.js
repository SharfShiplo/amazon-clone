import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: null,
  },
  reducers: {
    addAddress: (state, action) => {
      state.address = action.payload;
    },
    resetAddress: (state) => {
      state.address = null;
    },
  },
});

export const { addAddress, resetAddress } = addressSlice.actions;

export const selectAddress = (state) => state.address.address;

export default addressSlice.reducer;

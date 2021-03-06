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
  },
});

export const { addAddress } = addressSlice.actions;

export const selectAddress = (state) => state.address.address;

export default addressSlice.reducer;

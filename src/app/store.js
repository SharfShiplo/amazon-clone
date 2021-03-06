import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer, { putUser } from "../features/user/userSlice";
import basketReducer from "../features/basket/basket";
import addressRuducer from "../features/deliveryaddress/deliveryAddressSlice";
export default configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [putUser],
    },
  }),
  reducer: {
    basket: basketReducer,
    user: userReducer,
    address: addressRuducer,
  },
});

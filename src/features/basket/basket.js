import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket: [],
  },
  reducers: {
    addItem: (state, action) => {
      let itemIndex = state.basket.findIndex(
        (item) => item.id === action.payload.id
      );
      let updatedBasket = [...state.basket];
      if (itemIndex >= 0) {
        let currentCount = updatedBasket[itemIndex].count + 1;
        let updatedPrice = updatedBasket[itemIndex].price * currentCount;
        let updatedItem = {
          ...updatedBasket[itemIndex],
          count: currentCount,
          totalPrice: updatedPrice,
        };
        updatedBasket[itemIndex] = updatedItem;
      } else {
        updatedBasket = [...state.basket, action.payload];
      }
      state.basket = updatedBasket;
    },
    removeItem: (state, action) => {
      const index = state.basket.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        let currentCount = newBasket[index].count;
        if (currentCount > 1) {
          let updatedCount = --currentCount;
          let updatedPrice = newBasket[index].price * updatedCount;
          let updatedItem = {
            ...newBasket[index],
            count: updatedCount,
            totalPrice: updatedPrice,
          };
          newBasket[index] = updatedItem;
        } else {
          newBasket.splice(index, 1);
        }
      } else {
        console.warn(
          `can't remove the product (id: ${action.payload.id}) as its not in the basket`
        );
      }
      state.basket = newBasket;
    },
    deleteItem: (state, action) => {
      let oldBasket = state.basket;
      const remainedItems = oldBasket.filter(
        (item) => item.id !== action.payload.id
      );
      state.basket = remainedItems;
    },
    resetBasket: (state) => {
      state.basket = [];
    },
  },
});
export const getBasketTotal = (basket) => {
  const totalPrices = basket?.reduce(
    (amount, item) => item.totalPrice + amount,
    0
  );
  return totalPrices;
};
export const getBasketItems = (basket) => {
  const totalItem = basket?.reduce((count, item) => item.count + count, 0);
  return totalItem;
};
export const {
  addItem,
  removeItem,
  deleteItem,
  resetBasket,
} = basketSlice.actions;

export const selectBasket = (state) => state.basket.basket;

export default basketSlice.reducer;

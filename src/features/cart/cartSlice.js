import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      // Add item to the cart
      state.cart.push(action.payload);
    },
    removeItemFromCart: (state, action) => {
      // Remove item from the cart by id, note: id=action.payload
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantityByOne: (state, action) => {
      // increase item from the cart by id, note: id=action.payload
      const pizzaItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      pizzaItem.quantity++;
      pizzaItem.totalPrice = pizzaItem.quantity * pizzaItem.unitPrice;
    },
    decreaseQuantityByOne: (state, action) => {
      // decrease item from the cart by id, note: id=action.payload
      const pizzaItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      pizzaItem.quantity--;
      pizzaItem.totalPrice = pizzaItem.quantity * pizzaItem.unitPrice;

      if (pizzaItem.quantity === 0)
        cartReducer.caseReducers.removeItemFromCart(state, action);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  increaseQuantityByOne,
  decreaseQuantityByOne,
  clearCart,
} = cartReducer.actions;

export default cartReducer.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

/*
TODO: see "reselect library" from redux in order to optamize
  useSelectors as if we use to many useSelector()
  it can cause performance issues
*/

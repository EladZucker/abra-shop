import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITEMS_ENDPOINT, SERVER_URL } from "../constants";

const initialState = {
  items: [],
  cart: [],
};

export const fetchStoreItems = createAsyncThunk(
  "store/fetchStoreItems",
  async (_, thunkAPI) => {
    const response = await fetch(SERVER_URL + "/" + ITEMS_ENDPOINT);
    const data = await response.json();
    return data;
  }
);

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const itemId = action.payload;
      const storeItem = state.items.find((element) => element.id === itemId);
      if (storeItem.quantity === 0) return;

      storeItem.quantity--;

      let cartItem = state.cart.find((element) => element.id === itemId);

      if (!cartItem) {
        cartItem = { ...storeItem, quantity: 0 };
        state.cart = [...state.cart, cartItem];
      }

      cartItem.quantity++;
    },
    removeItemFromCart: (state, action) => {
      const { itemId, forceDelete } = action.payload;

      const storeItem = state.items.find((element) => element.id === itemId);
      const cartItem = state.cart.find((element) => element.id === itemId);

      if (cartItem.quantity === 0) return;

      if (forceDelete) {
        storeItem.quantity += cartItem.quantity;
        cartItem.quantity = 0;
      } else {
        cartItem.quantity--;
        storeItem.quantity++;
      }

      if ( cartItem.quantity === 0) {
        state.cart = state.cart.filter((item) => item.id !== cartItem.id);
      }
    },
    checkout: (state, action) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStoreItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { addItemToCart, checkout, removeItemFromCart } = storeSlice.actions;

export default storeSlice.reducer;

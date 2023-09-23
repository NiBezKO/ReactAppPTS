import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkApi) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://637fa1022f8f56e28e925aec.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );

  return data;
});

// extraReducers: (builder) => {
//     builder.addCase(fetchProducts.fulfilled, (state, action) => {
//       state.products = action.payload;
//     });

const initialState = {
  items: [], // товары в корзине
};

const pizzasSlice = createSlice({
  name: 'pizza', //имя на которое ссылается redux
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const selectPizzaData = (state) => state.pizza.items;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;

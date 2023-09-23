import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [], // товары в корзине
};

const cartSlice = createSlice({
  name: 'cart', //имя на которое ссылается redux
  initialState,
  reducers: {
    // //addItem тут мы передаём целый объект
    // addItem(state, action) {
    //   // сюда мы передаём объект item из PizzaBlock(именно это в state ниже)
    //   state.items.push(action.payload); // добавление всех пицц в массив
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price + sum;
    //   }, 0);
    // },
    addItem(state, action) {
      //мы найдём этот обьъект в items, если в стейте айтемсе был найдет объект  у которого id равен добовляемуму объекту в корзину
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      //если такой лбъект нашёлся, то мы этому объекту делаем count++
      if (findItem) {
        // если он был найден, то...
        findItem.count++; //увелич его в этом объекте count++
      } else {
        // если же этот объект не нашёлся, то мы будем добавлять снова объект
        state.items.push({
          ...action.payload, //берём, всё что нам пришло с компонента, и в конец добовляем:
          count: 1, //добавлен только один продукт
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    // plusItem(state, action) {
    //   const findItem = state.items.find((obj) => obj.id === action.payload);
    //   if (findItem) {
    //     // если он был найден, то...
    //     findItem.count++;
    //   }
    // },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItems(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload); // добавление всех пицц в массив
      //значение state хранится в payload
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;

export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItems, minusItem, plusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;

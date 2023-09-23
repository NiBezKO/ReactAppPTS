import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  //createSlice в переменную filterSlice создаст нам хранилище, который будет хранить в себе
  // некоторые састройки
  // name: filter - название хранилища
  // initialState - инициализируемое состояние
  // state.value - это мой стейт, в котором хранится вэлью

  name: 'filters', //имя на которое ссылается redux
  initialState,
  reducers: {
    //тут лежит объект
    //setCategoryId - это метод, который отвечает за то, чтобы сохранять id нашей категории
    setCategoryId(state, action) {
      state.categoryId = action.payload; // что меняет categoryId
      //значение state хранится в payload
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    // в Home redux выполняет функцию setCategoryId ссылаясь на name: filters
    setSort(state, action) {
      state.sort = action.payload; // что меняет categoryId
      //значение state хранится в payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload; // что меняет categoryId
      //значение state хранится в payload
    },
    setFilters(state, action) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
      } else {
        state.categoryId = 0;
        state.currentPage = 1;
        state.sort = {
          name: 'популярности',
          sortProperty: 'rating',
        };
      }
    },
  },
});

// так выглядит то, как изменяется setCategoryId
// constsetCategoryId2 = (id) => {
// return { type: filters/setCategoryId, payload: id}
//}

export const selectSort = (state) => state.filter.sort;

export const selectFilter = (state) => state.filter;

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;

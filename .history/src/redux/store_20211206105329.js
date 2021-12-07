import { configureStore } from '@reduxjs/toolkit';
// import { createStore, combineReducers } from 'redux';
// import listReducer from './listState/listReducer';
// let store = createStore(listReducer, initialState);

// const rootReducer = combineReducers({
//   todolist: listReducer
// });
// const store = configureStore({
//   reducer: { todolist: listReducer },
//   devTools: true
// });
import todolistReducer from './listState/slice';
const store = configureStore({
  reducer: { todolist: todolistReducer },
  devTools: true
});

export default store;

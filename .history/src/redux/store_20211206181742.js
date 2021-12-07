import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
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
import userSlice from './user/slice';

const rootReducer = combineReducers({
  todolist: todolistReducer,
  user: userSlice.reducer
});
const store = configureStore({
  reducer: rootReducer,
  devTools: true
});

export default store;

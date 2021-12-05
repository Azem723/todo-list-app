import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import { listReducer } from './listState/listReducer';

// export default configureStore({
//   reducer: {
//     todolist: listReducer
//   }
// });
const initialState = { todolist: [{ id: 1, text: 'aaa', isComplete: false }] };
let store = createStore(listReducer, initialState);
export default store;

import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import { listReducer } from './listState/listReducer';

// export default configureStore({
//   reducer: {
//     todolist: listReducer
//   }
// });

let store = createStore(listReducer);
export default store;

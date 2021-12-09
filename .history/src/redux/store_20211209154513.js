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

// 中间件，处理todolist各种操作
import { todolistMiddleWare } from './middleware/todolistMiddleWare';

// 浏览器缓存
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
const presistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  todolist: todolistReducer,
  user: userSlice.reducer
});

const persistedReducer = persistReducer(presistConfig, rootReducer); // 浏览器缓存

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: todolistMiddleWare
      },
      serializableCheck: false
    }),

  devTools: true
});

// 在 index ReactDOM.render() 中使用组件
const persistor = persistStore(store);

const rootstore = { store, persistor };
export default rootstore;

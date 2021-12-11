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
// 创建嵌套 presist 设置
// 本地只保存 uid 与 token 防止请求失败用户再次刷新时，loading 依旧为 true
const userPresistConfig = {
  key: 'user',
  storage: storage,
  blacklist: ['loading', 'error']
};
const presistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['todolist','user']
};

// 创建嵌套 presist
const rootReducer = combineReducers({
  todolist: todolistReducer,
  user: persistReducer(userPresistConfig, userSlice.reducer)
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
    }).concat(todolistMiddleWare),

  devTools: true
});

// 在 index ReactDOM.render() 中使用组件
const persistor = persistStore(store);

const rootstore = { store, persistor };
export default rootstore;

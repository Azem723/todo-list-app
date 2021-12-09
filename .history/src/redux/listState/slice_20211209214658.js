import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getInitialList = createAsyncThunk(
  'todolist/getInitialList',
  async () => {
    // console.log('getInitialList start');
    // const testApiFastMock =
    //   'https://www.fastmock.site/mock/ec3f45d4cf2bb5a3874fc0d304a8c735/todolist/api/getTodolist';
    const testApi = '/api/list/getTodolist';
    const { data } = await axios.get(testApi, {
      headers: {
        authorId: 123
      }
    });
    if (data.errno === 0) {
      return data.data;
    } else {
      throw new Error('error!');
    }
  }
);

const todolistSlice = createSlice({
  name: 'todolist',
  initialState: {
    data: [],
    firstTime: true,
    loading: false
  },
  reducers: {
    ADD_TODO: (state, action) => {
      // redux/toolkit 的 Immer 功能，这里的 state 是一个 Proxy
      // 允许我们把 state 从 immutabe 转化为 mutable 从而可以直接更改 State
      // 对他的直接更改，会在底层转化为一个新的 immutable state
      const newTodo = action.payload;
      state.data.push(newTodo);
    },

    REMOVE_TODO: (state, action) => {
      // 当然也可以不适用 immer 功能
      // 直接 return 一个新的 state
      // 通过 filter 创建一个新数组，通过 Object.assign 生成新的state
      const removeTodoArr = state.data.filter(
        (todo) => todo.id !== action.payload.delTodoId
      );
      const newState = Object.assign(state, { data: removeTodoArr });
      return newState;
    },

    UPDATE_TODO: (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload.id) {
          item.text = action.payload.text;
        }
        return item;
      });
      // const updatedArr = state.data.map((item) => {
      //   if (item.id === action.payload.id) {
      //     item = Object.assign({}, item);
      //     item.text = action.payload.text;
      //   }
      //   return item;
      // });
      // return updatedArr;
    },

    COMPLETE_TODO: (state, action) => {
      for (let item of state.data) {
        if (item.id === action.payload.completeTodoId) {
          item.isComplete = item.isComplete === 1 ? 0 : 1;
        }
      }
      // const completeTodoArr = state.map((item) => {
      //   if (item.id === action.payload) {
      //     item = Object.assign({}, item);
      //     item.isComplete = !item.isComplete;
      //   }
      //   return item;
      // });
      // return completeTodoArr;
    },
    REORDER_TODO: (state, action) => {
      state.data = action.payload;
      // const reOrderedList = action.payload.map((item, index) => {
      //   item = Object.assign({}, item);
      //   item.sortIndex = index;
      //   return item;
      // });
      // return reOrderedList;
    }
  },
  extraReducers: {
    [getInitialList.pending.type](state) {
      state.loading = true;
    },
    [getInitialList.fulfilled.type](state, action) {
      // console.log('getInitialList fulfilled');
      state.loading = false;
      state.firstTime = false;
      state.data = action.payload;
    },
    [getInitialList.rejected.type](state) {
      state.loading = false;
      // console.log('getInitialList fail');
    }
  }
});

export const {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  COMPLETE_TODO,
  REORDER_TODO
} = todolistSlice.actions;
export default todolistSlice.reducer;

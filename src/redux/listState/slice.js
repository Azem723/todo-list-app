import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getInitialList = createAsyncThunk(
  'todolist/getInitialList',
  async (paramaters, thunkAPI) => {
    // console.log('getInitialList start');
    const api = 'http://39.107.142.104:3030/api/list/getTodolist'

    const uid = thunkAPI.getState().user.uid;
    const token = thunkAPI.getState().user.token;
    const { data } = await axios.get(api, {
      headers: {
        uid: uid,
        Authorization: `Bearer ${token}`
      }
    });
    return data;
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
    },

    COMPLETE_TODO: (state, action) => {
      for (let item of state.data) {
        if (item.id === action.payload.completeTodoId) {
          item.isComplete = item.isComplete === 1 ? 0 : 1;
        }
      }
    },
    REORDER_TODO: (state, action) => {
      state.data = action.payload;
    },
    SET_FIRSTTIME: (state, aciton) => {
      state.firstTime = true;
    }
  },
  extraReducers: {
    [getInitialList.pending.type](state) {
      state.loading = true;
    },
    [getInitialList.fulfilled.type](state, action) {
      if (action.payload.errno === 0) {
        console.log('getInitialList fulfilled');
        state.loading = false;
        state.firstTime = false;
        state.data = action.payload.data;
      } else {
        state.loading = false;
      }
    },
    [getInitialList.rejected.type](state, action) {
      state.loading = false;
      console.log('getInitialList fail');
    }
  }
});

export const {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  COMPLETE_TODO,
  REORDER_TODO,
  SET_FIRSTTIME
} = todolistSlice.actions;
export default todolistSlice.reducer;

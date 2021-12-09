import { createSlice } from '@reduxjs/toolkit';

const todolistSlice = createSlice({
  name: 'todolist',
  initialState: {
    data: [
      { id: 12, text: 'aaa', isComplete: false, sortIndex: 0 },
      { id: 13, text: 'bbb', isComplete: false, sortIndex: 1 },
      { id: 14, text: 'ccc', isComplete: false, sortIndex: 2 },
      { id: 154, text: 'ddd', isComplete: false, sortIndex: 3 },
      { id: 1435, text: 'eee', isComplete: false, sortIndex: 4 },
      { id: 6345, text: 'fff', isComplete: false, sortIndex: 5 },
      { id: 234, text: 'ggg', isComplete: false, sortIndex: 6 }
    ]
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
        (todo) => todo.id !== action.payload.id
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
        if (item.id === action.payload.id) {
          item.isComplete = !item.isComplete;
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
      const reOrderedList = action.payload.map((item, index) => {
        item = Object.assign({}, item);
        item.sortIndex = index;
        return item;
      });
      state.data = reOrderedList;
      console.log(state.data);
      // const reOrderedList = action.payload.map((item, index) => {
      //   item = Object.assign({}, item);
      //   item.sortIndex = index;
      //   return item;
      // });
      // return reOrderedList;
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

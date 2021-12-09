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
      // action.payload.sortIndex = state[state.length - 1].sortIndex + 1;
      // const newTodo = [...state, action.payload];
      // newTodo.sortIndex = state.length
      //   ? state[state.length - 1].sortIndex + 1
      //   : 0;
      // const newTodosList = [...state.data, newTodo];
      const newTodo = action.payload;
      state.data = [...state.data, newTodo];
      return state;
    },

    REMOVE_TODO: (state, action) => {
      const removeTodoArr = state.data.filter(
        (todo) => todo.id !== action.payload.id
      );
      const newState = Object.assign(state, { data: removeTodoArr });
      return newState;
    },

    UPDATE_TODO: (state, action) => {
      const updatedArr = state.data.map((item) => {
        if (item.id === action.payload.id) {
          item = Object.assign({}, item);
          item.text = action.payload.text;
        }
        return item;
      });

      return updatedArr;
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
      // const reOrderedList = [...action.payload];
      // console.log(action.payload)
      const reOrderedList = action.payload.map((item, index) => {
        item = Object.assign({}, item);
        item.sortIndex = index;
        return item;
      });
      return reOrderedList;
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

import { createSlice } from '@reduxjs/toolkit';

const todolistSlice = createSlice({
  name: 'todolist',
  initialState: [
    { id: 12, text: 'aaa', isComplete: false, sortIndex: 1 },
    { id: 13, text: 'bbb', isComplete: false, sortIndex: 2 },
    { id: 14, text: 'ccc', isComplete: false, sortIndex: 3 },
    { id: 154, text: 'ddd', isComplete: false, sortIndex: 4 },
    { id: 1435, text: 'eee', isComplete: false, sortIndex: 5 },
    { id: 6345, text: 'fff', isComplete: false, sortIndex: 6 },
    { id: 234, text: 'ggg', isComplete: false, sortIndex: 7 },
    { id: 32, text: 'hhh', isComplete: false, sortIndex: 8 }
  ],
  reducers: {
    ADD_TODO: (state, action) => {
      // action.payload.sortIndex = state[state.length - 1].sortIndex + 1;
      // const newTodo = [...state, action.payload];

      const newTodo = action.payload;
      newTodo.sortIndex = state[state.length - 1].sortIndex + 1;
      const newTodosList = [...state, newTodo];
      return newTodosList;
    },

    REMOVE_TODO: (state, action) => {
      const removeTodoArr = state.filter((todo) => todo.id !== action.payload);
      return removeTodoArr;
    },

    UPDATE_TODO: (state, action) => {
      const updatedArr = state.map((item) => {
        if (item.id === action.payload.id) {
          item = Object.assign({}, item);
          item.text = action.payload.text;
        }
        return item;
      });
      return updatedArr;
    },

    COMPLETE_TODO: (state, action) => {
      for (let item of state) {
        if (item.id === action.payload) {
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
    }
  }
});

export const { ADD_TODO, REMOVE_TODO, UPDATE_TODO, COMPLETE_TODO } =
  todolistSlice.actions;
export default todolistSlice.reducer;

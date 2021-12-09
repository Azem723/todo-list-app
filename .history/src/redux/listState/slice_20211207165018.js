import { createSlice } from '@reduxjs/toolkit';

const todolistSlice = createSlice({
  name: 'todolist',
  initialState: [
    { id: 1, text: 'aaa', isComplete: false },
    { id: 2, text: 'bbb', isComplete: false },
    { id: 3, text: 'ccc', isComplete: false },
    { id: 4, text: 'ddd', isComplete: false },
    { id: 5, text: 'eee', isComplete: false },
    { id: 6, text: 'fff', isComplete: false },
    { id: 7, text: 'ggg', isComplete: false },
    { id: 8, text: 'hhh', isComplete: false }
  ],
  reducers: {
    ADD_TODO: (state, action) => {
      const newTodos = [...state, action.payload];
      return newTodos;
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

// 导入 ActionCreator
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  COMPLETE_TODO
} from './listActions';

// 初始化 state
const defaultState = [];

export function listReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_TODO:
      const newTodos = [action.payload, ...state];
      return newTodos;
    case REMOVE_TODO:
      const removeTodoArr = [...state].filter(
        (todo) => todo.id !== action.payload.id
      );
      return removeTodoArr;
    case UPDATE_TODO:
      const newTodoArr = [...state].map((item) => {
        if (item.id === action.payload.id) {
          item.text = action.payload.text;
        }
      });
      return newTodoArr;
    case COMPLETE_TODO:
      const updatedTodoArr = state.map((item) => {
        if (item.id === action.payload.id) {
          item.isComplete = !item.isComplete;
        }
      });
      return updatedTodoArr;
    default:
      return state;
  }
}

// 导入 ActionCreator
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  COMPLETE_TODO
} from './listActions';

export default function listReducer(state = [], action) {
  switch (action.type) {
    // 不使用 configureStore 时，通过 state.todolist 获取状态
    // case ADD_TODO:
    //   const newTodos = {
    //     ...state,
    //     todolist: [...state.todolist, action.payload]
    //   };
    //   return newTodos;
    case ADD_TODO:
      const newTodos = [...state, action.payload];
      return newTodos;
    case REMOVE_TODO:
      const removeTodoArr = state.filter((todo) => todo.id !== action.payload);
      return removeTodoArr;
    case UPDATE_TODO:
      const updatedArr = state.map((item) => {
        if (item.id === action.payload.id) {
          item = Object.assign({}, item);
          item.text = action.payload.text;
        }
        return item;
      });
      return updatedArr;
    case COMPLETE_TODO:
      const completeTodoArr = state.map((item) => {
        if (item.id === action.payload) {
          item = Object.assign({}, item);
          item.isComplete = !item.isComplete;
        }
        return item;
      });
      return completeTodoArr;
    default:
      return state;
  }
}

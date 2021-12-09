import axios from 'axios';

const addTodo = async (action) => {
  const { id, text, isComplete, sortIndex, isDaily } = action.payload;
  const { data } = await axios.post(
    `https://www.fastmock.site/mock/ec3f45d4cf2bb5a3874fc0d304a8c735/todolist/api/addtodo`,
    {
      id: id,
      text: text,
      isComplete: isComplete,
      sortIndex: sortIndex,
      isDaily: isDaily
    }
  );
  return data;
};

export const todolistMiddleWare = (store) => (next) => (action) => {
  // console.log('state now');
  console.log('fire action', action);
  switch (action.type) {
    case 'todolist/GET_TODO':
      break;
    case 'todolist/ADD_TODO':
      addTodo(action).then((data) => {
        console.log((data));
      });
      break;
    case 'todolist/REMOVE_TODO':
      break;
    case 'todolist/UPDATE_TODO':
      break;
    case 'todolist/COMPLETE_TODO':
      break;
    case 'todolist/REORDER_TODO':
      break;
    default:
      break;
  }
  next(action);
  // console.log('state update');
};

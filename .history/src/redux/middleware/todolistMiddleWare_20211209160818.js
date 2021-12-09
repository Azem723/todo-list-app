import axios from 'axios';

const addTodo = async (action, authodId) => {
  const packet = Object.assign({ authodId: authodId }, action.payload);
  const { data } = await axios.post(
    `https://www.fastmock.site/mock/ec3f45d4cf2bb5a3874fc0d304a8c735/todolist/api/addtodo`,
    packet
  );
  return data;
};

export const todolistMiddleWare = (store) => (next) => (action) => {
  // console.log('state now',store);
  console.log('fire action', action);
  const authorId = store.getState().user.uid;
  switch (action.type) {
    case 'todolist/GET_TODO':
      break;
    case 'todolist/ADD_TODO':
      addTodo(action, authorId).then((data) => {
        console.log(data);
      });
      break;
    case 'todolist/REMOVE_TODO':
      break;
    case 'todolist/UPDATE_TODO':
      break;
    case 'todolist/COMPLETE_TODO':
      addTodo(action, authorId).then((data) => {
        console.log(data);
      });
      break;
    case 'todolist/REORDER_TODO':
      break;
    default:
      break;
  }
  next(action);
  // console.log('state updated',store);
};

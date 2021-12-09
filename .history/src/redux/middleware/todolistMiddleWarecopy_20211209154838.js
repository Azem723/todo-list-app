export const todolistMiddleWarecopy = (store) => (next) => (action) => {
  // console.log('state now');
  console.log('fire action', action);
  switch (action.type) {
    case 'todolist/GET_TODO':
      break;
    case 'todolist/ADD_TODO':
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

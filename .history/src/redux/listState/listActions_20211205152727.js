export const ADD_TODO = 'add_todo';
export const REMOVE_TODO = 'remove_todo';
export const UPDATE_TODO = 'update_todo';
export const COMPLETE_TODO = 'complete_todo';

export const addTodoActionCreator = (todo) => {
  return {
    type: 'add_todo',
    payload: todo
  };
};

export const removeTodoActionCreator = (id) => {
  return {
    type: 'remove_todo',
    payload: id
  };
};

export const updateTodoActionCreator = (todoid, newValue) => {
  return {
    type: 'update_todo',
    payload: { id: todoid, text: newValue }
  };
};

export const completeTodoActionCreator = (id) => {
  return {
    type: 'complete_todo',
    payload: id
  };
};

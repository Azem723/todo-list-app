export const ADD_TODO = 'add_todo';
export const REMOVE_TODO = 'remove_todo';
export const UPDATE = 'update_todo';
export const COMPLETE_TODO = 'complete_todo';

export const addTodoActionCreator = (todo) => {
  return {
    type: 'ADD_TODO',
    payload: todo
  };
};

export const removeTodoActionCreator = (id) => {
  return {
    type: 'REMOVE_TODO',
    payload: id
  };
};

export const updateTodoActionCreator = (todoid, newValue) => {
  return {
    type: 'UPDATE_TODO',
    payload: { id: todoid, text: newValue }
  };
};

export const completeTodoActionCreator = (id) => {
  return {
    type: 'COMPLETE_TODO',
    payload: id
  };
};

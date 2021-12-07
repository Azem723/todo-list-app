import { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
// import {
//   removeTodoActionCreator,
//   completeTodoActionCreator
// } from '../redux/listState/listActions';
import { REMOVE_TODO, COMPLETE_TODO } from '../redux/listState/slice';

function Todo({ todos }) {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = () => {
    setEdit({
      id: null,
      value: ''
    });
  };

  const completeTodo = (id) => {
    dispatch(COMPLETE_TODO(id));
  };

  const removeTodo = (id) => {
    dispatch(REMOVE_TODO(id));
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => {
    return (
      <div
        className={todo.isComplete === true ? 'todo-row complete' : 'todo-row'}
        key={index}
        draggable={true}
      >
        <div
          className="row-text"
          key={todo.id}
          onClick={() => completeTodo(todo.id)}
        >
          {todo.text}
        </div>
        <div className="icons">
          <RiCloseCircleLine
            className="delete-icon"
            onClick={() => {
              removeTodo(todo.id);
            }}
          />
          <TiEdit
            className="edite-icon"
            onClick={() => {
              setEdit({ id: todo.id, value: todo.text });
            }}
          />
        </div>
      </div>
    );
  });
}

export default Todo;

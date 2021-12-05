import { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import {
  updateTodoActionCreator,
  removeTodoActionCreator,
  completeTodoActionCreator
} from '../redux/listState/listActions';

function Todo({ todos }) {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = (value) => {
    dispatch(updateTodoActionCreator(edit.id, value));
    setEdit({
      id: null,
      value: ''
    });
  };

  const completeTodo = (id) => {
    dispatch(completeTodoActionCreator(id));
  };

  const removeTodo = (id) => {
    dispatch(removeTodoActionCreator(id));
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => {
    console.log(todo);
    return (
      <div
        className={todo.isComplete === false ? 'todo-row complete' : 'todo-row'}
        key={index}
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

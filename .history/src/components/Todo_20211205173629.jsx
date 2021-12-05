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
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} />;
  }

  return todos.map((todo, index) => {
    return (
      <div
        className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
        key={index}
      >
        <div className="row-text" key={todo.id}>
          {todo.text}
        </div>
        <div className="icons">
          <RiCloseCircleLine className="delete-icon" />
          <TiEdit className="edite-icon" />
        </div>
      </div>
    );
  });
}

export default Todo;

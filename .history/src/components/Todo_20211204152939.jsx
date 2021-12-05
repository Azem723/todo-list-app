import { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

function Todo({ todos, completeTodo, removeTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  return todos.map((todo, index) => {
    return (
      <div
        className={todo.isComplete ? 'todo-row isComplete' : 'todo-row'}
        key={index}
      >
        <div key={todo.id} onClick={() => completeTodo(todo.id)}>
          {todo.text}
        </div>
        <div className="icons">
          <RiCloseCircleLine
            onClick={() => {
              removeTodo(todo.id);
            }}
            className="delete-icon"
          />
          <TiEdit
            onClick={() => {
              setEdit(todo.text);
            }}
            className="edite-icon"
          />
        </div>
      </div>
    );
  });
}

export default Todo;

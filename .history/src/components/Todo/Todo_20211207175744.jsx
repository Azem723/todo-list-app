import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
// import {
//   removeTodoActionCreator,
//   completeTodoActionCreator
// } from '../redux/listState/listActions';
import { REMOVE_TODO, COMPLETE_TODO } from '../../redux/listState/slice';

function Todo(props) {
  const dispatch = useDispatch();
  const { todoItem, setEdit } = props;

  const completeTodo = (id) => {
    dispatch(COMPLETE_TODO(id));
  };

  const removeTodo = (id) => {
    dispatch(REMOVE_TODO(id));
  };

  return (
    <div
      className={
        todoItem.isComplete === true ? 'todo-row complete' : 'todo-row'
      }
    >
      <div
        className="row-text"
        key={todoItem.id}
        onClick={() => completeTodo(todoItem.id)}
      >
        {todoItem.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          className="delete-icon"
          onClick={() => {
            removeTodo(todoItem.id);
          }}
        />
        <TiEdit
          className="edite-icon"
          onClick={() => {
            setEdit({ id: todoItem.id, value: todoItem.text });
          }}
        />
      </div>
    </div>
  );
}

export default Todo;

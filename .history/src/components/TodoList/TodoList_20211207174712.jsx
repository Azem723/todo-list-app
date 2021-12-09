import { useState } from 'react';
import TodoForm from '../todoForm/TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
// import {
//   removeTodoActionCreator,
//   completeTodoActionCreator
// } from '../redux/listState/listActions';
import { REMOVE_TODO, COMPLETE_TODO } from '../../redux/listState/slice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TodoList({ todos }) {
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

  // 拖拽
  const onDragEnd = (resule) => {
    if (!resule.destination) {
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="todoItems" direction="vertical">
          {(provided, snapshot) => (
            <div
              // provided.droppableProps 应用的相同元素
              {...provided.droppableProps}
              // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
              ref={provided.innerRef}
            >
              {todos.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  // draggableId 命名规则 draggableId='draggable-1' 不能使用 index！
                  draggableId={'draggable-' + todo.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={'todo-row'}
                    >
                      {todo.text}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );

  // return todos.map((todo, index) => {
  //   return (
  //     <div
  //       className={todo.isComplete === true ? 'todo-row complete' : 'todo-row'}
  //       key={index}
  //     >
  //       <div
  //         className="row-text"
  //         key={todo.id}
  //         onClick={() => completeTodo(todo.id)}
  //       >
  //         {todo.text}
  //       </div>
  //       <div className="icons">
  //         <RiCloseCircleLine
  //           className="delete-icon"
  //           onClick={() => {
  //             removeTodo(todo.id);
  //           }}
  //         />
  //         <TiEdit
  //           className="edite-icon"
  //           onClick={() => {
  //             setEdit({ id: todo.id, value: todo.text });
  //           }}
  //         />
  //       </div>
  //     </div>
  //   );
  // });
}

export default TodoList;

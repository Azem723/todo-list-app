import Styles from './TodoList.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { REORDER_TODO } from '../../redux/listState/slice';
import TodoForm from '../todoForm/TodoForm';
import Todo from '../todo/Todo';
// import {
//   removeTodoActionCreator,
//   completeTodoActionCreator
// } from '../redux/listState/listActions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TodoList() {
  // const todos = Array.from(props.todos).sort(
  //   (a, b) => a.sortIndex - b.sortIndex
  // );
  // const todos = Array.from(props.todos);
  const todos = useSelector((state) => state.todolist);
  const dispath = useDispatch();

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

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  // 拖拽相关功能
  // todolist 重排序，返回重拍后的新数组
  const reorder = (todolist, startIndex, endIndex) => {
    const result = Array.from(todolist);
    const [dragTodo] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, dragTodo);
    return result;
  };
  // onDragEnd 函数再拖拽结束后触发
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newTodoArr = reorder(
      todos,
      result.source.index,
      result.destination.index
    );
    // todolist 重排后的数组 dispatch 出去
    dispath(REORDER_TODO(newTodoArr));
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
                  shouldRespectForcePress={false}
                >
                  {(provided, snapshot) => (
                    <div
                      className={`${Styles['todo-container']} ${
                        Styles[`color${todo.id % 5}`]
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Todo todoItem={todo} setEdit={setEdit} />
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
}

export default TodoList;

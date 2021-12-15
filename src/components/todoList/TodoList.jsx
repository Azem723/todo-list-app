import Styles from './TodoList.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { REORDER_TODO } from '../../redux/listState/slice';
import TodoForm from '../todoForm/TodoForm';
import Todo from '../todo/Todo';
import Loading from '../loading/Loading';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TodoList() {
  const todos = useSelector((state) => state.todolist.data);
  const loading = useSelector((state) => state.todolist.loading);
  const dispath = useDispatch();

  // 控制分割线是否出现
  const [splitBlockDisplay, setsplitBlockDisplay] = useState(false);

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
  } else if (loading) {
    return <Loading />;
  }

  // 将 todo 拆分为日常与非日常
  // Draggable 组件需要传入 index，index值不能重复
  // 通常设置为数组元素的 index，因此需要拆分出两个新数组
  const todosArr = {
    dailyTodos: todos.filter((item) => item.isDaily === 1),
    todayTodos: todos.filter((item) => item.isDaily === 0)
  };

  const updateSortIndex = (item, index, arrId) => {
    // list 中各项为引用类型的对象
    // 直接修改会导致 redux 报错(不可变值)
    // 使用浅拷贝返回新的 item
    item = Object.assign({}, item);
    item.sortIndex = index;
    // 根据组件 drop 的位置更新 isDaily
    item.isDaily = arrId === 'dailyTodos' ? 1 : 0;
    return item;
  };

  // 传入参数 原始数组id, 拖拽进入数组id， 起始index， 结束index
  // 将 todosArr 中的日常与非日常重排后进行拼接，返回一个新数组
  const reorder = (originArr, targetArr, startIndex, endIndex) => {
    const [dragTodo] = todosArr[originArr].splice(startIndex, 1);
    todosArr[targetArr].splice(endIndex, 0, dragTodo);
    todosArr[targetArr] = todosArr[targetArr].map((item, index) => {
      return updateSortIndex(item, index, targetArr);
    });
    if (originArr !== targetArr) {
      todosArr[originArr] = todosArr[originArr].map((item, index) => {
        return updateSortIndex(item, index, originArr);
      });
    }
    return todosArr.dailyTodos.concat(todosArr.todayTodos);
  };

  /**
   *  原本想设置成，拖拽开始时分割线与文字提示出现
   *  但是 DragDropContext 的高度在拖拽时突变的话，在拖拽结束时会出现抖动
   *  因此设置成分割线永远显示，问题提示随拖拽动作出现和消失
   */
  // onDragStart 函数在拖拽开始时触发
  const onDragStart = () => {
    setsplitBlockDisplay(true); // 日常任务文字显示
  };
  // onDragEnd 函数在拖拽结束后触发
  const onDragEnd = (result) => {
    setsplitBlockDisplay(false); //  日常任务文字消失

    // 拖拽未改变顺序直接 return
    if (!result.destination) {
      return;
    } else if (
      result.destination.index === result.source.index &&
      result.destination.droppableId === result.source.droppableId
    ) {
      return;
    }

    // 重排 + 设置日常
    const newTodoArr = reorder(
      result.source.droppableId,
      result.destination.droppableId,
      result.source.index,
      result.destination.index
    );

    // todolist 重排后的数组 dispatch 出去
    dispath(REORDER_TODO(newTodoArr));
  };

  return (
    <>
      <div
        className={Styles.dailyText}
        style={{ opacity: splitBlockDisplay ? 1 : 0 }}
      >
        日常任务
      </div>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="dailyTodos" direction="vertical">
            {(provided, snapshot) => (
              <div
                // provided.droppableProps 应用的相同元素
                {...provided.droppableProps}
                // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
                ref={provided.innerRef}
                // Drop Area 的 min-height 需要设置在这里，防止列表清空时高度为0
                className={Styles.dropArea}
              >
                {todosArr.dailyTodos.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    // draggableId 命名规则 draggableId='draggable-1' 不能使用 index！
                    draggableId={'draggable-' + todo.id}
                    // todo 需要拆分成两个数组，组件的index是唯一且相邻的
                    index={index}
                    shouldRespectForcePress={true}
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
          <div className={Styles.splitBlock}>
            <div className={Styles.splitLine}></div>
          </div>
          <Droppable
            className={Styles.dropArea}
            droppableId="todayTodos"
            direction="vertical"
          >
            {(provided, snapshot) => (
              <div
                // provided.droppableProps 应用的相同元素
                {...provided.droppableProps}
                // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
                ref={provided.innerRef}
                className={Styles.dropArea}
              >
                {todosArr.todayTodos.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    // draggableId 命名规则 draggableId='draggable-1' 不能使用 index！
                    draggableId={'draggable-' + todo.id}
                    index={index}
                    shouldRespectForcePress={true}
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
    </>
  );
}

export default TodoList;

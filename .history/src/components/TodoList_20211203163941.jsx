import React, { useState } from 'react';
import TodoForm from './TodoForm';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    // 空格输入
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    // 不可变值，用解构的方法，构造新数组更新 state
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log(...todos);
  };

  return (
    <div>
      <h1>今日计划</h1>
      {/* // 将 addTodo 函数作为 props 传递给子组件，使子组件能与父组件通信 */}
      <TodoForm onSubmit={addTodo} />
    </div>
  );
}

export default TodoList;

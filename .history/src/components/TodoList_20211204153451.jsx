import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

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
    // console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    // 空格输入
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>今日计划</h1>
      {/* // 将 addTodo 函数作为 props 传递给子组件，使子组件能与父组件通信 */}
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;

// import React, { useState } from 'react';
import TodoForm from '../../components/TodoForm/TodoForm';
import Todo from '../../components/Todo/Todo';
import { useSelector } from 'react-redux';

function TodoList() {
  const todos = useSelector((state) => state.todolist);

  return (
    <div>
      <h1>今日计划</h1>
      <TodoForm />
      <Todo todos={todos} />
    </div>
  );
}

export default TodoList;

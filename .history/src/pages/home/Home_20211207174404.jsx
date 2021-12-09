// import React, { useState } from 'react';
import TodoForm from '../../components/todoform/TodoForm';
import Todo from '../../components/todo/Todo';
import { useSelector } from 'react-redux';

function Home() {
  const todos = useSelector((state) => state.todolist);

  return (
    <div>
      <h1>今日计划</h1>
      <TodoForm />
      <Todo todos={todos} />
    </div>
  );
}

export default Home;

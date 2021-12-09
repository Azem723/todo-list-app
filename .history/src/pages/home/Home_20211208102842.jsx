// import React, { useState } from 'react';
import TodoForm from '../../components/todoForm/TodoForm';
import TodoList from '../../components/todoList/TodoList';


function Home() {
  return (
    <div>
      <h1>今日计划</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default Home;

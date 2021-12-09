// import React, { useState } from 'react';
import TodoForm from '../../components/todoForm/TodoForm';
import Todo from '../../components/todo/Todo';
import TodoList from '../../components/todoList/TodoList';
import { useSelector } from 'react-redux';

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

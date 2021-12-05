import React, { useState } from 'react';

function TodoForm() {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="请输入计划"
        value={input}
        name="text"
        className="todo-input"
      />
      <button className="todo-button">添加</button>
    </form>
  );
}

export default TodoForm;

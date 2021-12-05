import React, { useState } from 'react';

// props 包含父组件传递的方法 addTodo
function TodoForm(props) {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 使用父组件传递的方法向父组件传值
    props.thesubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });

    setInput('');
  };

  return (
    <form className="todo-form" thesubmit={handleSubmit}>
      <input
        type="text"
        placeholder="请输入计划"
        value={input}
        name="text"
        className="todo-input"
        onChange={handleChange}
      />
      <button className="todo-button">添加</button>
    </form>
  );
}

export default TodoForm;

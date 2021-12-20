import Styles from './TodoForm.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_TODO, UPDATE_TODO } from '../../redux/listState/slice';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input || /^\s*$/.test(input)) {
      return;
    }
    if (props.edit) {
      dispatch(UPDATE_TODO({ id: props.edit.id, text: input }));
      props.onSubmit();
    } else {
      dispatch(
        ADD_TODO({
          id: Math.floor(Math.random() * 10000),
          text: input,
          isComplete: 0,
          isDaily: 0
        })
      );
    }

    setInput('');
  };

  return (
    <form className={Styles['todo-form']} onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="请更新计划"
            value={input}
            name="text"
            className={`${Styles['todo-input']} ${Styles['edit']}`}
            onChange={handleChange}
          />
          <button className={`${Styles['todo-button']} ${Styles['edit']}`}>
            更新
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="请输入计划"
            value={input}
            name="text"
            className={Styles['todo-input']}
            onChange={handleChange}
          />
          <button className={Styles['todo-button']}>添加</button>
        </>
      )}
    </form>
  );
}

export default TodoForm;

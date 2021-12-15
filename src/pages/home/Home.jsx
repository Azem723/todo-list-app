import Styles from './Home.module.css';
import TodoForm from '../../components/todoForm/TodoForm';
import TodoList from '../../components/todoList/TodoList';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInitialList } from '../../redux/listState/slice';
import { RiSettings3Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function Home() {
  const firstTime = useSelector((state) => state.todolist.firstTime);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // console.log('home excute useEffect');
    if (firstTime) {
      dispatch(getInitialList());
      // dispatch(GET_TODO())
    }
  },[firstTime]); // eslint-disable-line

  return (
    <div>
      <h1>今日计划</h1>
      <TodoForm />
      <TodoList />
      <RiSettings3Line
        onClick={() => {
          navigate('/userinfo');
        }}
        className={Styles.SettingIcon}
      />
      <div className={Styles.cutter}></div>
    </div>
  );
}

export default Home;

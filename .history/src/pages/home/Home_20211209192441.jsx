import { useSelector, useDispatch } from 'react-redux';
import TodoForm from '../../components/todoForm/TodoForm';
import TodoList from '../../components/todoList/TodoList';

function Home() {
  const firstTime = useSelector((state) => state.todolist.firstTime);
  return (
    <div>
      <h1>今日计划</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default Home;

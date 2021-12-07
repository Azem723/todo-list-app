import './App.css';
// import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="todo-app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/todolist" component={TodoList} />
        </Routes>
      </BrowserRouter>

      {/* <TodoList /> */}
    </div>
  );
}

export default App;

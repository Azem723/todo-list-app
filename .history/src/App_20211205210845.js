import './App.css';
// import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="todo-app">
      <BrowserRouter>
        <Routes>
          <Route path="/" component={TodoList} />
          <Route
            render={() => (
              <>
                <h1>404 not found</h1>
                <div>Oh No! The page is missing</div>
              </>
            )}
          />
        </Routes>
      </BrowserRouter>

      {/* <TodoList /> */}
    </div>
  );
}

export default App;

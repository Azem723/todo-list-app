import './App.css';
// import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="todo-app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TodoList} />
        </Switch>
      </BrowserRouter>

      {/* <TodoList /> */}
    </div>
  );
}

export default App;

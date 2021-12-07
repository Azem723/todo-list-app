import './App.css';
// import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import NotFoundPage from './pages/NotFoundPages';
import LoginPage from './pages/login/LoginPage';
import RegiserPage from './pages/register/RegisterPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from './components/loading/Loading';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router';

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <TodoList /> : <Navigate to="/" />;
};

function App() {
  const loading = useSelector((state) => state.user.loading);
  const jwt = useSelector((state) => state.user.token);

  function loadingMask(loading) {
    if (loading) {
      return <Loading />;
    } else {
      return null;
    }
  }

  return (
    <div className="todo-app" id={'todoApp'}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<RegiserPage />} />
          <Route
            path="/home"
            element={<isAuthenticated isAuthenticated={jwt} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      {loadingMask(loading)}
      {/* <TodoList /> */}
    </div>
  );
}

export default App;

import './App.css';
// import TodoForm from './components/TodoForm';
import Home from './pages/home/Home';
import NotFoundPage from './pages/NotFoundPages';
import LoginPage from './pages/login/LoginPage';
import RegiserPage from './pages/register/RegisterPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from './components/loading/Loading';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router';

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Home /> : <Navigate to="/" />;
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
    <div className='fixedBg'>
      <div className="todo-app" id={'todoApp'}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<RegiserPage />} />
            <Route
              path="/home"
              element={<PrivateRoute isAuthenticated={jwt} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        {loadingMask(loading)}
        {/* <TodoList /> */}
      </div>
    </div>
  );
}

export default App;

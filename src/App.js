import './App.css';
// import TodoForm from './components/TodoForm';
import Home from './pages/home/Home';
import NotFoundPage from './pages/NotFoundPages';
import LoginPage from './pages/login/LoginPage';
import RegiserPage from './pages/register/RegisterPage';
import Toast from './components/toast/Toast';
import Loading from './components/loading/Loading';
import UserInfoPage from './pages/userinfo/UserInfoPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router';
import { showToast } from './components/toast/Toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logOut } from './redux/user/slice';
import { SET_FIRSTTIME } from './redux/listState/slice';

const PrivateRoute = ({ element: Component, isAuthenticated: jwt }) => {
  // console.log(component, isAuthenticated);
  return jwt ? <Component /> : <Navigate to="/" />;
};

function App() {
  const loading = useSelector((state) => state.user.loading);
  const jwt = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  // 拦截器，拦截token过期
  axios.interceptors.response.use(
    function (response) {
      if (response.data.errno === -2) {
        showToast(response.data.message);
        dispatch(logOut());
      }
      return response;
    },
    function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );

  // clear FirstTime
  if (jwt === null) {
    dispatch(SET_FIRSTTIME());
  }

  function loadingMask(loading) {
    if (loading) {
      return <Loading />;
    } else {
      return null;
    }
  }

  return (
    <div className="fixedBg">
      <div className="todo-app" id={'todoApp'}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<RegiserPage />} />
            <Route
              path="/home"
              element={<PrivateRoute element={Home} isAuthenticated={jwt} />}
            />
            <Route
              path="/userinfo"
              element={
                <PrivateRoute element={UserInfoPage} isAuthenticated={jwt} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        {loadingMask(loading)}
        {/* <TodoList /> */}
        <Toast />
      </div>
    </div>
  );
}

export default App;

import styles from '../../styles/SignupAndRegist.module.css';
import { useState, useEffect } from 'react';
import { signIn } from '../../redux/user/slice';
import { useDispatch, useSelector } from 'react-redux';

function LoginPage() {
  // 组件 state 获取用户输入
  const [userLogInInput, setUserLogInInput] = useState({
    userName: '',
    password: ''
  });
  function handleUserNameInput(e) {
    setUserLogInInput({ ...userLogInInput, userName: e.target.value });
  }
  function handlePasswordInput(e) {
    setUserLogInInput({ ...userLogInInput, password: e.target.value });
  }

  const dispatch = useDispatch();

  // 连接 redux 获取 token
  const jwt = useSelector((state) => state.user.token);

  useEffect(() => {
    console.log('jwt:', jwt);
  }, [jwt]);

  function handleLogin(e) {
    e.preventDefault();
    dispatch(signIn(userLogInInput));
    console.log('userInput:', userLogInInput);
  }
  
  return (
    <>
      <h1 className={styles['firstPage-title']}>Task-APP</h1>
      <h2 className={styles['firstPage-header']}>Please login</h2>
      <form className={styles['firstPage-form']} onSubmit={handleLogin}>
        <input
          className={styles['firstPage-input']}
          type="text"
          value={userLogInInput.userName}
          onChange={handleUserNameInput}
          placeholder="请输入用户名"
        />
        <input
          className={`${styles['firstPage-input']} ${styles['firstPage-password']}`}
          type="text"
          value={userLogInInput.password}
          onChange={handlePasswordInput}
          placeholder="请输入密码"
        />
        <button className={styles['firstPage-button']}>登 录</button>
        <a className={styles['firstPage-SignupRegsitSwitch']} href="/signup">
          注册
        </a>
      </form>
    </>
  );
}

export default LoginPage;

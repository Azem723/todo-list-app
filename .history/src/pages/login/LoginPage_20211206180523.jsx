import styles from '../../styles/SignupAndRegist.module.css';
import { useState } from 'react';
import { signIn } from '../../redux/user/slice';

function LoginPage() {
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
  function handleLogin(e) {
    e.preventDefault();
    console.log(userLogInInput);
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

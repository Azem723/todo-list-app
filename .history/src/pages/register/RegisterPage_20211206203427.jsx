import styles from '../../styles/SignupAndRegist.module.css';
import { useState } from 'react';

function RegiserPage() {
  const [userRegistInput, setUserRegistInput] = useState({
    username: '',
    password: '',
    ensurement: ''
  });

  function handleRegistInput(e, inputType) {
    setUserRegistInput({ ...userRegistInput, inputType: e.target.value });
  }

  return (
    <>
      <h1 className={styles['firstPage-title']}>Task-APP</h1>
      <h2 className={styles['firstPage-header']}>Please Regist</h2>
      <form className={styles['firstPage-form']}>
        <input
          className={styles['firstPage-input']}
          type="text"
          required="required"
          value={userRegistInput.username}
          onChange={handleRegistInput('username')}
          placeholder="请输入用户名"
        />
        <input
          className={`${styles['firstPage-input']} ${styles['firstPage-password']}`}
          type="text"
          required="required"
          value={userRegistInput.password}
          onChange={handleRegistInput('password')}
          placeholder="请输入密码"
        />
        <input
          className={`${styles['firstPage-input']} ${styles['firstPage-password']}`}
          type="text"
          required="required"
          value={userRegistInput.ensurement}
          onChange={handleRegistInput('ensurement')}
          placeholder="请确认密码"
        />
        <button className={styles['firstPage-button']}>注 册</button>
        <a href="/login" className={styles['firstPage-SignupRegsitSwitch']}>
          已有账号？
        </a>
      </form>
    </>
  );
}

export default RegiserPage;

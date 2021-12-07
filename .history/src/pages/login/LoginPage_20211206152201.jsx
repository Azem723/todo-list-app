import styles from './LoginPage.module.css';

function LoginPage() {
  return (
    <>
      <h1 className={styles['login-title']}>Task-APP</h1>
      <h2>Plase login</h2>
      <form className={styles['login-form']}>
        <input
          className={styles['login-input']}
          type="text"
          placeholder="请输入用户名"
        />
        <input
          className={`${styles['login-input']} ${styles['login-password']}`}
          type="text"
          placeholder="请输入密码"
        />
        <button className={styles['login-button']}>登录</button>
      </form>
    </>
  );
}

export default LoginPage;

import styles from './LoginPage.module.css';

function LoginPage() {
  return (
    <>
      <h1 className={styles['login-title']}>请登录</h1>
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
        <button className={styles['login-form']}>登录</button>
      </form>
    </>
  );
}

export default LoginPage;

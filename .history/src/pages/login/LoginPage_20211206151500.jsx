import styles from './LoginPage.module.css';

function LoginPage() {
  return (
    <>
      <h1 className={styles['login-title']}>请登录</h1>
      <form className={styles['login-form']}>
        <input
          className={[styles['login-input'], styles['login-username']]}
          type="text"
        />
        <input className={styles['login-input']} type="text" />
        <button className={styles['login-form']}>登录</button>
      </form>
    </>
  );
}

export default LoginPage;

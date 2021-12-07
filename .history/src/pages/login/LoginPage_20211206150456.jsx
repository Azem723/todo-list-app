import styles from './LoginPage.module.css';

function LoginPage() {
  return (
    <>
      <h1 className={styles['login-title']}>请登录</h1>
      <form className={styles['login-form']}>
        <input type="text" />
        <input type="text" />
        <button>登录</button>
      </form>
    </>
  );
}

export default LoginPage;

import styles from '../../styles/SignupAndRegist.css';

function LoginPage() {
  return (
    <>
      <h1 className={styles['login-title']}>Task-APP</h1>
      <h2 className={styles['login-header']}>Plase Regist</h2>
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
        <input
          className={`${styles['login-input']} ${styles['login-password']}`}
          type="text"
          placeholder="请确认密码"
        />
        <button className={styles['login-button']}>注 册</button>
        <a href="/login" className={styles['login-tosignup']}>
          已有账号？
        </a>
      </form>
    </>
  );
}

export default LoginPage;

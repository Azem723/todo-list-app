import styles from '../../styles/SignupAndRegist.css';

function LoginPage() {
  return (
    <>
      <h1 className={styles['title']}>Task-APP</h1>
      <h2 className={styles['header']}>Plase Regist</h2>
      <form className={styles['form']}>
        <input
          className={styles['input']}
          type="text"
          placeholder="请输入用户名"
        />
        <input
          className={`${styles['input']} ${styles['password']}`}
          type="text"
          placeholder="请输入密码"
        />
        <input
          className={`${styles['input']} ${styles['password']}`}
          type="text"
          placeholder="请确认密码"
        />
        <button className={styles['button']}>注 册</button>
        <a href="/login" className={styles['SignupRegsitSwitch']}>
          已有账号？
        </a>
      </form>
    </>
  );
}

export default LoginPage;

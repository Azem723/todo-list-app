import styles from '../../styles/SignupAndRegist.module.css';

function LoginPage() {
  return (
    <>
      <h1 className={styles['firstPage-title']}>Task-APP</h1>
      <h2 className={styles['firstPage-header']}>Please login</h2>
      <form className={styles['firstPage-form']}>
        <input
          className={styles['firstPage-input']}
          type="text"
          placeholder="请输入用户名"
        />
        <input
          className={`${styles['firstPage-input']} ${styles['firstPage-password']}`}
          type="text"
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

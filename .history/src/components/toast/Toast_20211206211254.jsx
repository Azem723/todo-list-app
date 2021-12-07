import Styles from './Toast.module.css';

function Toast(message) {
  return <div className={Styles.toast}>{message}</div>;
}

export default Toast;

import Styles from './Toast.module.css';

function Toast(message) {
  return (
    <div className={Styles.toast}>
      <div className={Styles.toastMessage}></div>
    </div>
  );
}

export default Toast;

import Styles from './Toast.module.css';

function Toast(message) {
  return (
    <div className={Styles.toast}>
      <div className={Styles.toastMessage}>
        Toast
      </div>
    </div>
  );
}

export default Toast;

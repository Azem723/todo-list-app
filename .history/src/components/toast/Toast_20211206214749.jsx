import Styles from './Toast.module.css';

function Toast(props) {
  return (
    <div className={Styles.toast}>
      <div className={Styles.toastMessage}>{props.toastMessage}</div>
    </div>
  );
}

export default Toast;

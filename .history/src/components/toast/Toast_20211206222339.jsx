import Styles from './Toast.module.css';

function Toast(message) {
  let timerToast = null;
  clearTimeout(timerToast);
  console.log('toast!')

  function setTime() {
    timerToast = setTimeout(() => {
      let toast = document.getElementById('toast');
      if (toast) {
        toast.style.display = 'none';
      }
    }, 3000);
  }

  const toastElement = (message) => {
    return (
      <div className={Styles.toast} id={'toast'}>
        <div className={Styles.toastMessage}>{message}</div>
      </div>
    );
  };

  let app = document.getElementById('todoApp');
  let toast = toastElement(message);
  app.appendChild(toast);
  setTime();
}

export default Toast;

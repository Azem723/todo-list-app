import Styles from './Toast.module.css';
import { Fragment } from 'react';
import reactDom from 'react-dom';

let timerToast = null;
function setTime() {
  timerToast = setTimeout(() => {
    let toast = document.getElementById('toast');
    if (toast) {
      toast.style.display = 'none';
    }
  }, 3000);
}

const toastElement = (message) => {
  return reactDom.render(
    <Fragment>
      <div className={Styles.toast}>
        <div className={Styles.toastMessage}>{message}</div>
      </div>
    </Fragment>,
    document.getElementById('toast')
  );
};

export const showToast = function (message) {
  clearTimeout(timerToast);
  toastElement(message);
  setTime();
};

function Toast() {
  return <div id={'toast'}></div>;
}

export default Toast;

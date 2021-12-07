import Styles from './Toast.module.css';
import { Fragment } from 'react';
import reactDom from 'react-dom';

function Toast(message) {
  let timerToast = null;
  clearTimeout(timerToast);
  console.log(message);

  // function setTime() {
  //   timerToast = setTimeout(() => {
  //     let toast = document.getElementById('toast');
  //     if (toast) {
  //       toast.style.display = 'none';
  //     }
  //   }, 3000);
  // }

  const toastElement = (message) => {
    return reactDom.render(
      <Fragment>
        <div className={Styles.toast} id={'toast'}>
          <div className={Styles.toastMessage}>{message}</div>
        </div>
      </Fragment>,
      document.getElementById('toast')
    );
  };

  let todoApp = document.getElementById('todoApp');
  let toast = toastElement(message);
  console.log(todoApp, toast);
  todoApp.appendChild(toast);
  return <div id={'toast'}></div>;
}

export default Toast;

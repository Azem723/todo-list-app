import Styles from './Toast.module.css';
import { useState, useEffect } from 'react';

function Toast(props) {
  
}

function setTime() {
  const timerToast = setTimeout(() => {
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

export default Toast;

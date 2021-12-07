import Styles from './Toast.module.css';
function Toast() {
  return (
    <div className={Styles.mask}>
      <div className={'loading'}></div>
    </div>
  );
}
export default Toast;

import Styles from './Toast.module.css';
export function Toast() {
  return (
    <div className={Styles.mask}>
      <div className={'loading'}></div>
    </div>
  );
}
// export default Toast;

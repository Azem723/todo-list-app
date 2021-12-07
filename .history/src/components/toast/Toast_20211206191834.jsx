import Styles from './Toast.module.css';
function Toast() {
  return (
    <div className={Styles.mask}>
      <div className={Styles.loader}>
        <span className="loader-block"></span>
        <span className="loader-block"></span>
        <span className="loader-block"></span>
        <span className="loader-block"></span>
        <span className="loader-block"></span>
        <span className="loader-block"></span>
        <span className="loader-block"></span>
        <span className="loader-block"></span>
        <span className="loader-block"></span>
      </div>
    </div>
  );
}
export default Toast;

import Styles from './infoCtrl.module.css';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/user/slice';

export default function InfoCtrl(props) {
  const dispatch = useDispatch();
  const { setInfoDisplay } = props;
  return (
    <div>
      <button
        onClick={() => {
          setInfoDisplay(1);
        }}
        className={Styles.infoButton}
      >
        修改用户名
      </button>
      <button
        onClick={() => {
          setInfoDisplay(2);
        }}
        className={Styles.infoButton}
      >
        修改密码
      </button>
      <button
        onClick={() => {
          dispatch(logOut());
        }}
        className={Styles.infoButton}
      >
        注 销
      </button>
    </div>
  );
}

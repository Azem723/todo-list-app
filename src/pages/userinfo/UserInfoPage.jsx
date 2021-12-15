import Styles from './UserinfoPage.module.css';
import InfoCtrl from '../../components/infoctrl/InfoCtrl';
import ChangePassword from '../../components/changepassword/ChangePassword';
import ChangeName from '../../components/changename/ChangeName';
import { useState, useEffect } from 'react';

import { RiAlignRight } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showToast } from '../../components/toast/Toast';
import { clearErr } from '../../redux/user/slice';

function UserInfoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const err = useSelector((state) => state.user.error);
  const [infoDisplay, setInfoDisplay] = useState(3);

  useEffect(() => {
    if (err !== null) {
      showToast(err);
      return () => {
        dispatch(clearErr());
      };
    }
  }, [err]); // eslint-disable-line
  useEffect(() => {
    setInfoDisplay(3);
  }, [username]); // eslint-disable-line

  return (
    <div>
      <h1 className={Styles.userinfoTitle}>Welcome</h1>
      <div className={Styles.username}>{username}</div>

      {(() => {
        switch (infoDisplay) {
          case 1:
            return (
              <ChangeName
                setInfoDisplay={setInfoDisplay}
                oldUsername={username}
              />
            );
          case 2:
            return <ChangePassword setInfoDisplay={setInfoDisplay} />;
          default:
            return <InfoCtrl setInfoDisplay={setInfoDisplay} />;
        }
      })()}

      <RiAlignRight
        onClick={() => {
          navigate('/home');
        }}
        className={Styles.SettingIcon}
      />
      <div className={Styles.cutter}></div>
    </div>
  );
}

export default UserInfoPage;

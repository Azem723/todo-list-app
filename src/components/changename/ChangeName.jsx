import Styles from '../../styles/infoComponents.module.css';
import { useState } from 'react';
import { showToast } from '../toast/Toast';
import { changeUsername } from '../../redux/user/slice';
import { useDispatch } from 'react-redux';

export default function ChangeName(props) {
  const { setInfoDisplay, oldUsername } = props;
  const dispatch = useDispatch();
  const [newUsername, setnewUsername] = useState('');
  function handleChangeNameInput(e) {
    setnewUsername(e.target.value);
  }
  function handleChangeNameSubmit() {
    if (newUsername === oldUsername) {
      showToast('请输入新的用户名');
      return;
    } else if (
      !newUsername ||
      /(^\s+)|(\s+$)|\s+/g.test(newUsername) ||
      !(newUsername.length >= 5 && newUsername.length <= 15)
    ) {
      showToast('请输入5-15位用户名，不能包含空格');
      return;
    }
    dispatch(changeUsername(newUsername));
  }
  return (
    <div className={Styles['info-form']} action="">
      <div className={Styles['info-header']}>修改用户名</div>
      <input
        className={Styles['info-input']}
        type="text"
        placeholder={'请输入新用户名'}
        value={newUsername}
        onChange={(e) => {
          handleChangeNameInput(e);
        }}
      />
      <button
        onClick={() => {
          setInfoDisplay(3);
        }}
        className={`${Styles['info-button']} ${Styles['info-cancel']}`}
      >
        取消
      </button>
      <button
        onClick={handleChangeNameSubmit}
        className={Styles['info-button']}
      >
        确认
      </button>
    </div>
  );
}

import Styles from '../../styles/infoComponents.module.css';
import { showToast } from '../toast/Toast';
import { useState } from 'react';
import { changePassword } from '../../redux/user/slice';
import { useDispatch } from 'react-redux';

export default function ChangePassword(props) {
  const { setInfoDisplay } = props;
  const dispatch = useDispatch();
  const [updatePassword, setupdatePassword] = useState({
    oldPassword: '',
    newPassword: '',
    ensurement: ''
  });
  function handleNewPasswordInput(e, inputType) {
    setupdatePassword({ ...updatePassword, [inputType]: e.target.value });
  }
  function handleNewPasswordSubmit() {
    const { oldPassword, newPassword, ensurement } = updatePassword;
    if (!oldPassword || !newPassword || !ensurement) {
      showToast('输入不能为空');
      return;
    } else if (oldPassword === newPassword) {
      showToast('新密码不能与旧密码相同');
      return;
    } else if (!/^[a-zA-Z0-9]{1}([a-zA-Z0-9]){4,19}$/.test(newPassword)) {
      showToast('请输入5-20位的英文与数字密码');
      return;
    } else if (newPassword !== ensurement) {
      showToast('两次输入的新密码不一致');
      return;
    }
    dispatch(changePassword(updatePassword));
  }

  return (
    <div className={Styles['info-form']} action="">
      <div className={Styles['info-header']}>修改密码</div>
      <input
        className={`${Styles['info-input']}`}
        type="password"
        placeholder={'请输入原密码'}
        value={updatePassword.oldPassword}
        onChange={(e) => {
          handleNewPasswordInput(e, 'oldPassword');
        }}
      />
      <input
        className={`${Styles['info-input']} ${Styles['info-password']}`}
        type="password"
        placeholder={'请输入新密码'}
        value={updatePassword.newPassword}
        onChange={(e) => {
          handleNewPasswordInput(e, 'newPassword');
        }}
      />
      <input
        className={`${Styles['info-input']} ${Styles['info-password']}`}
        type="password"
        placeholder={'请确认新密码'}
        value={updatePassword.ensurement}
        onChange={(e) => {
          handleNewPasswordInput(e, 'ensurement');
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
        onClick={handleNewPasswordSubmit}
        className={Styles['info-button']}
      >
        确认
      </button>
    </div>
  );
}

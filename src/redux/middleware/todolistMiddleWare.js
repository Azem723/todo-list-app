import axios from 'axios';
import { getInitialList } from '../listState/slice';
import { showToast } from '../../components/toast/Toast';

// 封装后的 Post 方法
const axiosPost = async (acPayload, api, uid, token) => {
  const packet = Object.assign({ uid: uid }, acPayload);
  // console.log(packet);
  try {
    const { data } = await axios.post(api, packet, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
// 封装后的 Put 方法
const axiosPut = async (acPayload, api, uid, token) => {
  const packet = Object.assign({ uid: uid }, acPayload);
  // console.log(packet);
  try {
    const { data } = await axios.put(api, packet, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const todolistMiddleWare = (store) => (next) => (action) => {
  // console.log('state now', store);
  // console.log('fire action', action);
  const uid = store.getState().user.uid;
  const token = store.getState().user.token;
  const dispatch = store.dispatch;

  let api = 'http://39.107.142.104:3030/api/list/'; //prd

  switch (action.type) {
    case 'todolist/ADD_TODO':
      let addTodoApi = api + 'addTodo';
      let storelist = store.getState().todolist.data;

      // 为新的 todo 添加 sortIndex
      action.payload.sortIndex = storelist.length
        ? storelist[storelist.length - 1].sortIndex + 1
        : 0;

      axiosPost(action.payload, addTodoApi, uid, token).then((data) => {
        if (data.errno && data.errno === -1) {
          showToast(data.message);
          dispatch(getInitialList());
        }
        // console.log(data);
      });
      break;

    case 'todolist/REMOVE_TODO':
      let removeTodoApi = api + 'delTodo';
      axiosPost(action.payload, removeTodoApi, uid, token).then((data) => {
        if (data.errno && data.errno === -1) {
          showToast(data.message);
          dispatch(getInitialList());
        }
        // console.log(data);
      });
      break;

    case 'todolist/UPDATE_TODO':
      let updateTodoApi = api + 'updateTodo';
      axiosPut(action.payload, updateTodoApi, uid, token).then((data) => {
        if (data.errno && data.errno === -1) {
          showToast(data.message);
          dispatch(getInitialList());
        }
        // console.log(data);
      });
      break;

    case 'todolist/COMPLETE_TODO':
      let completeTodoApi = api + 'completeTodo';
      axiosPut(action.payload, completeTodoApi, uid, token).then((data) => {
        if (data.errno && data.errno === -1) {
          showToast(data.message);
          dispatch(getInitialList());
        }
        // console.log(data);
      });
      break;

    case 'todolist/REORDER_TODO':
      let reorderTodoApi = api + 'reorderTodo';
      let reorderPacket = {
        reorder: action.payload.map((item) => {
          return {
            id: item.id,
            sortIndex: item.sortIndex,
            isDaily: item.isDaily
          };
        })
      };
      axiosPost(reorderPacket, reorderTodoApi, uid, token).then((data) => {
        if (data.errno && data.errno === -1) {
          showToast(data.message);
          dispatch(getInitialList());
        }
        // console.log(data);
      });
      break;

    default:
      break;
  }
  next(action);
  // console.log('state updated',store);
};

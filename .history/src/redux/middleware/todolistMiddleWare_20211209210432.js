import axios from 'axios';

// 封装后的 Post Put 方法
const axiosPost = async (acPayload, api, authorId) => {
  const packet = Object.assign({ authorId: authorId }, acPayload);
  console.log(packet);
  try {
    const { data } = await axios.post(api, packet);
    return data;
  } catch (err) {
    return err;
  }
};

const axiosPut = async (acPayload, api, authorId) => {
  const packet = Object.assign({ authorId: authorId }, acPayload);
  console.log(packet);
  try {
    const { data } = await axios.put(api, packet);
    return data;
  } catch (err) {
    return err;
  }
};

export const todolistMiddleWare = (store) => (next) => (action) => {
  // console.log('state now',store);
  // console.log('fire action', action);
  const authorId = store.getState().user.uid;

  // 测试用 api
  // let api =
  //   'https://www.fastmock.site/mock/ec3f45d4cf2bb5a3874fc0d304a8c735/todolist/api/';
  let api = '/api/list/';
  switch (action.type) {
    case 'todolist/GET_TODO':
      break;

    case 'todolist/ADD_TODO':
      let addTodoApi = api + 'addTodo';
      let storelist = store.getState().todolist.data;

      // 为新的 todo 添加 sortIndex
      action.payload.sortIndex = storelist.length
        ? storelist[storelist.length - 1].sortIndex + 1
        : 0;

      axiosPost(action.payload, addTodoApi, authorId).then((data) => {
        console.log(data);
      });
      break;

    case 'todolist/REMOVE_TODO':
      let removeTodoApi = api + 'delTodo';
      axiosPost(action.payload, removeTodoApi, authorId).then((data) => {
        console.log(data);
      });
      break;

    case 'todolist/UPDATE_TODO':
      let updateTodoApi = api + 'updateTodo';
      axiosPut(action.payload, updateTodoApi, authorId).then((data) => {
        console.log(data);
      });
      break;

    case 'todolist/COMPLETE_TODO':
      let completeTodoApi = api + 'completeTodo';
      axiosPut(action.payload, completeTodoApi, authorId).then((data) => {
        console.log(data);
      });
      break;

    case 'todolist/REORDER_TODO':
      let reorderTodoApi = api + 'reorderTodo';
      let reorderPacket = {
        reorder: action.payload.map((item, index) => {
          return { id: item.id, sortIndex: index };
        })
      };
      axiosPost(reorderPacket, reorderTodoApi, authorId).then((data) => {
        console.log(data);
      });
      break;

    default:
      break;
  }
  next(action);
  // console.log('state updated',store);
};

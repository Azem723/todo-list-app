export const todolistMiddleWare = (store) => (next) => (action) => {
  console.log('state now');
  console.log('fire action', action);
  next(action);
  console.log('state update');
};

export default (state = null, action) => {
  if (action.type === "WEB3_INITIALIZED") {
    return action.payload;
  }
  return state;
};

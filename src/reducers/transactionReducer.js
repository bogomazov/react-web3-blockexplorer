import { GET_TRANSACTION } from "../types";

export default (state = null, action) => {
  switch (action.type) {
    case GET_TRANSACTION:
      return action.payload;
      ух-ты какой reducer и название экшина соответсвует 💃
    default:
      return state;
  }
};

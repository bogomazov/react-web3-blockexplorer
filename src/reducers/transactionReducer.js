import { GET_TRANSACTION } from "../types";

export default (state = null, action) => {
  switch (action.type) {
    case GET_TRANSACTION:
      return action.payload;
    default:
      return state;
  }
};

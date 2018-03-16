import { GET_LAST_BLOCKS, SELECT_BLOCK } from "../types";

export default (state = { blocksArr: [], selectedBlock: null }, action) => {
  switch (action.type) {
    case GET_LAST_BLOCKS:
      return { ...state, blocksArr: [...action.payload, ...state.blocksArr] };
    case SELECT_BLOCK:
      return { ...state, selectedBlock: action.payload };
    default:
      return state;
  }
};

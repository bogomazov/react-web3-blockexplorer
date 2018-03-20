import {
  GET_LAST_BLOCKS,
  SELECT_BLOCK,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  ADD_BLOCK,
} from "../types";

// The most complexed reducer for blocks logic
export default (
  state = { blocksArr: [], selectedBlock: null, page: 1 },
  action,
) => {
  switch (action.type) {
    case GET_LAST_BLOCKS:
      return { ...state, blocksArr: [...action.payload, ...state.blocksArr] };
    case SELECT_BLOCK:
      return { ...state, selectedBlock: action.payload - что же у нас в этом payload'e? и как в этом удостоверится? и selectedBlock передаем - "очень хорошая идея" :) };
    case ADD_BLOCK:
      return { ...state, blocksArr: [...state.blocksArr, action.payload] };
    case NEXT_PAGE:
      return { ...state, page: state.page + 1 };
    case PREVIOUS_PAGE:
      return { ...state, page: state.page - 1 };
    default:
      return state;
  }
};

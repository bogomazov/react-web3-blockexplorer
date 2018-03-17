import { WEB3_INITIALIZED, INITIAL_BLOCK } from "../types";

export default (
  state = { web3Instance: null, initialBlock: undefined },
  action,
) => {
  switch (action.type) {
    case WEB3_INITIALIZED:
      return { ...state, web3Instance: action.payload };
    case INITIAL_BLOCK:
      return { ...state, initialBlock: action.payload };
    default:
      return state;
  }
};

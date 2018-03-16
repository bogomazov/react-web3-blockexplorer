import _ from "lodash";
import { GET_LAST_BLOCKS, SELECT_BLOCK } from "../types";

export const getLastBlocks = (amount = 10) => (dispatch, getState) => {
  const { eth } = getState().web3;
  const blocksFetched = getState().blocks.blocksArr.length;
  eth.getBlockNumber().then(number => {
    Promise.all(
      _.times(amount, i => eth.getBlock(number - blocksFetched - i)),
    ).then(blocks => {
      dispatch({
        type: GET_LAST_BLOCKS,
        payload: blocks,
      });
    });
  });
};

export const getBlock = block => dispatch => {
  dispatch({
    type: SELECT_BLOCK,
    payload: block,
  });
};

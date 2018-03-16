import _ from "lodash";
import { GET_LAST_BLOCKS, SELECT_BLOCK } from "../types";

export const getLastBlocks = (amount = 10) => (dispatch, getState) => {
  const { eth } = getState.web3;
  const { blocksFetched } = getState.blocks.blocksArr.length;
  dispatch({
    type: GET_LAST_BLOCKS,
    payload: _.times(amount, i =>
      eth.getBlock(eth.blockNumber - blocksFetched - i),
    ),
  });
};

export const getBlock = block => dispatch => {
  dispatch({
    type: SELECT_BLOCK,
    payload: block,
  });
};

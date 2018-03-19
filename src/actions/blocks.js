import _ from "lodash";
import {
  GET_LAST_BLOCKS,
  SELECT_BLOCK,
  ADD_BLOCK,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  BLOCKS_PER_PAGE,
} from "../types";

// Fetching many blocks with afterloading logic of more and more blocks
export const getLastBlocks = (amount = BLOCKS_PER_PAGE) => (
  dispatch,
  getState,
) => {
  const state = getState();
  const { eth } = state.web3.web3Instance;
  const blocksFetched = state.blocks.blocksArr.length;
  const initialBlockNumber = state.web3.initialBlock;
  Promise.all(
    _.times(amount, i => eth.getBlock(initialBlockNumber - blocksFetched - i)),
  ).then(blocks => {
    dispatch({
      type: GET_LAST_BLOCKS,
      payload: blocks.reverse(),
    });
  });
};

// Action creator which dispatch action on every new block from network
export const listenToNewBlocks = () => (dispatch, getState) => {
  const { eth } = getState().web3.web3Instance;
  eth
    .subscribe("newBlockHeaders", error => {
      if (error) console.log(`Subscription error: ${error}`);
    })
    .on("data", block => {
      dispatch({ type: ADD_BLOCK, payload: block });
    });
};

// Actions for pagination
export const nextPage = () => ({ type: NEXT_PAGE });

export const previousPage = () => ({ type: PREVIOUS_PAGE });

// Fetching blocks by one
export const getBlock = blockNumber => (dispatch, getState) => {
  const { eth } = getState().web3.web3Instance;
  eth.getBlock(blockNumber).then(block => {
    dispatch({
      type: SELECT_BLOCK,
      payload: block,
    });
  });
};

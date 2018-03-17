import _ from "lodash";
import { push } from "react-router-redux";
import {
  GET_LAST_BLOCKS,
  SELECT_BLOCK,
  ADD_BLOCK,
  NEXT_PAGE,
  PREVIOUS_PAGE,
} from "../types";

export const getLastBlocks = (amount = 10) => (dispatch, getState) => {
  const state = getState();
  const { eth } = state.web3.web3Instance;
  const blocksFetched = state.blocks.blocksArr.length;
  const initialBlockNumber = state.web3.initialBlock;
  console.log(initialBlockNumber);
  Promise.all(
    _.times(amount, i => eth.getBlock(initialBlockNumber - blocksFetched - i)),
  ).then(blocks => {
    dispatch({
      type: GET_LAST_BLOCKS,
      payload: blocks.reverse(),
    });
  });
};

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

export const nextPage = () => dispatch => {
  dispatch({ type: NEXT_PAGE });
};

export const previousPage = () => dispatch => {
  dispatch({ type: PREVIOUS_PAGE });
};

export const selectBlock = block => dispatch => {
  dispatch(push(block.hash));
  dispatch({
    type: SELECT_BLOCK,
    payload: block,
  });
};

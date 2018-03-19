import { GET_TRANSACTION } from "../types";

// Fetching transaction
export default (blockNumber, transactionNumber) => (dispatch, getState) => {
  const { eth } = getState().web3.web3Instance;
  eth
    .getTransactionFromBlock(blockNumber, transactionNumber)
    .then(transaction =>
      dispatch({ type: GET_TRANSACTION, payload: transaction }),
    );
};

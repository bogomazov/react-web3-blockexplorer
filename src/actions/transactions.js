import { GET_TRANSACTION } from "../types";

// Fetching transaction
export default transactionHash => (dispatch, getState) => {
  const { eth } = getState().web3.web3Instance;
  eth
    .getTransaction(transactionHash)
    .then(transaction =>
      dispatch({ type: GET_TRANSACTION, payload: transaction }),
    );
};

import Web3 from "web3";
import store from "../store";
import { WEB3_INITIALIZED, INITIAL_BLOCK } from "../types";

// Web3 init.
export default () => {
  const web3 = new Web3("wss://mainnet.infura.io/ws"); // I chose infura because of the websocket support for realtime blocks update
  store.dispatch({ type: WEB3_INITIALIZED, payload: web3 });
  return web3.eth
    .getBlockNumber()
    .then(number => store.dispatch({ type: INITIAL_BLOCK, payload: number })); // Saving last block in store (needed for pagination)
};
разделение на utils +

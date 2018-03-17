import Web3 from "web3";
import store from "../store";
import { WEB3_INITIALIZED, INITIAL_BLOCK } from "../types";

export default () => {
  const web3 = new Web3("wss://mainnet.infura.io/ws");
  store.dispatch({ type: WEB3_INITIALIZED, payload: web3 });
  return web3.eth
    .getBlockNumber()
    .then(number => store.dispatch({ type: INITIAL_BLOCK, payload: number }));
};

import Web3 from "web3";
import store from "../store";

export const WEB3_INITIALIZED = "WEB3_INITIALIZED";
function web3Initialized(web3) {
  return {
    type: WEB3_INITIALIZED,
    payload: web3,
  };
}

const getWeb3 = new Promise(resolve => {
  window.addEventListener("load", () => {
    let { web3 } = window;

    if (typeof web3 !== "undefined") {
      web3 = new Web3(web3.currentProvider);

      console.log("Injected web3 detected.");

      resolve(store.dispatch(web3Initialized(web3)));
    } else {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");

      web3 = new Web3(provider);

      console.log("No web3 instance injected, using Local web3.");

      resolve(store.dispatch(web3Initialized(web3)));
    }
  });
});

export default getWeb3;

import "semantic-ui-css/semantic.css";
import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import App from "./components/App";
import history from "./history";
import store from "./store";
import getWeb3 from "./utils/getWeb3";

getWeb3
  .then(() => {
    console.log("Web3 initialized!");
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route path="/" component={App} />
        </ConnectedRouter>
      </Provider>,
      document.getElementById("root"),
    );
  })
  .catch(() => {
    console.log("Error in web3 initialization.");
  });

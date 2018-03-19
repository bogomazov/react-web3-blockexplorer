import React from "react";
import { hot } from "react-hot-loader";
import { Grid } from "semantic-ui-react";
import { Route, withRouter } from "react-router-dom";
import BlocksComponent from "./BlocksComponent";
import BlockInfoComponent from "./BlockInfoComponent";
import TransactionsComponent from "./TransactionsComponent";
import TransactionInfoComponent from "./TransactionInfoComponent";

const App = () => {
  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Row>
          <BlocksComponent />
        </Grid.Row>
      </Grid>
      <Grid column="equal">
        <Grid.Row>
          <Grid.Column width={6}>
            <Route path="/:block" component={BlockInfoComponent} />
          </Grid.Column>
          <Grid.Column width={5}>
            <Route
              path="/:block/transactions"
              component={TransactionsComponent}
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <Route
              path="/:block/transactions/:transaction"
              component={TransactionInfoComponent}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default hot(module)(withRouter(App)); //eslint-disable-line

import React from "react";
import { hot } from "react-hot-loader";
import { Grid } from "semantic-ui-react";
import { Route, withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import BlocksComponent from "./BlocksComponent";
import BlockInfoComponent from "./BlockInfoComponent";
import TransactionsComponent from "./TransactionsComponent";
import TransactionInfoComponent from "./TransactionInfoComponent";

const App = () => {
  return (
    <>
    ^ оригинально
      <Helmet>
        <title>REACT-WEB3-BLOCKEXPLORER</title>
      </Helmet>
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
              интересная задумка, но если TransactionInfoComponent - логически часть TransactionsComponent (что в свою очередь относится к BlockInfoComponent),
              всю эту радость можно было бы инкапсулировать (имея древовидную архитектуру, вместо плоской) и соответсвенно передавать через parent component
              Если ты опытный - скорее всего тебе это в первую очередь в голову пришло, решил по-экспериментировать? 
              component={TransactionInfoComponent}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default hot(module)(withRouter(App)); //eslint-disable-line

import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Segment, Grid } from "semantic-ui-react";
import BlocksComponent from "./BlocksComponent";

class App extends Component {
  render() {
    return (
      <>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Segment
            style={{ padding: "8em 0em", width: "100%" }}
            textAlign="center"
          >
            <BlocksComponent />
          </Segment>
          <Grid.Column />
        </Grid>
      </>
    );
  }
}

export default hot(module)(App); //eslint-disable-line

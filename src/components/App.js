import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Segment } from "semantic-ui-react";
import BlocksComponent from "./BlocksComponent";

class App extends Component {
  render() {
    return (
      <>
        <Segment>
          <BlocksComponent />
        </Segment>
      </>
    );
  }
}

export default hot(module)(App); //eslint-disable-line

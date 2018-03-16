import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Segment, Container } from "semantic-ui-css";
import BlocksComponent from "./BlocksComponent";

class App extends Component {
  render() {
    return (
      <>
        <Container textAlign="center" text>
          <Segment>
            <BlocksComponent />
          </Segment>
        </Container>
      </>
    );
  }
}

export default hot(App);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Step } from "semantic-ui-react";
import { connect } from "react-redux";
import { getLastBlocks } from "../actions/blocks";

class BlocksComponent extends Component {
  componentDidMount() {
    this.props.getLastBlocks();
  }

  render() {
    const { blocks } = this.props;
    return (
      <>
        <Step.Group size="mini">
          {blocks.map(block => (
            <Step key={block.number}>
              <Step.Content>
                <Step.Title>Block {block.number}</Step.Title>
                <Step.Description>
                  {block.transactions.length} transactions
                </Step.Description>
              </Step.Content>
            </Step>
          ))}
        </Step.Group>
      </>
    );
  }
}

BlocksComponent.propTypes = {
  getLastBlocks: PropTypes.func.isRequired,
  blocks: PropTypes.array.isRequired,
};

export default connect(({ blocks }) => ({ blocks: blocks.blocksArr }), {
  getLastBlocks,
})(BlocksComponent);

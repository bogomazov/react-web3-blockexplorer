import React, { Component } from "react";
import PropTypes from "prop-types";
import { Step, Segment, Menu, Transition } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  getLastBlocks,
  selectBlock,
  nextPage,
  previousPage,
  listenToNewBlocks,
} from "../actions/blocks";
import { getVisibleBlocks } from "../selectors";

class BlocksComponent extends Component {
  componentDidMount() {
    this.props.listenToNewBlocks();
  }

  render() {
    const {
      blocks,
      selectBlock,
      selectedBlock,
      page,
      nextPage,
      previousPage,
      getLastBlocks,
    } = this.props;

    const isLoading = blocks.length < 10;
    if (isLoading) getLastBlocks();
    return (
      <>
        <Segment basic loading={isLoading}>
          <Transition.Group
            as={Step.Group}
            duration={200}
            animation="fade"
            size="mini"
          >
            {blocks.map(block => (
              <Step
                link
                key={block.number}
                onClick={() => selectBlock(block)}
                active={
                  selectedBlock !== null
                    ? selectedBlock.number === block.number
                    : false
                }
              >
                <Step.Content>
                  <Step.Title>Block {block.number}</Step.Title>
                  <Step.Description>
                    {block.transactions !== undefined
                      ? `${block.transactions.length} transactions`
                      : "New block"}
                  </Step.Description>
                </Step.Content>
              </Step>
            ))}
          </Transition.Group>
          <Segment basic>
            <Menu floated="right">
              <Menu.Item onClick={() => nextPage()}>{"<<<"}</Menu.Item>
              <Menu.Item active>{page}</Menu.Item>
              <Menu.Item onClick={() => previousPage()} disabled={page === 1}>
                {">>>"}
              </Menu.Item>
            </Menu>
          </Segment>
        </Segment>
      </>
    );
  }
}

BlocksComponent.propTypes = {
  selectBlock: PropTypes.func.isRequired,
  getLastBlocks: PropTypes.func.isRequired,
  blocks: PropTypes.array.isRequired,
  selectedBlock: PropTypes.object,
  listenToNewBlocks: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    blocks: getVisibleBlocks(state),
    selectedBlock: state.blocks.selectedBlock,
    page: state.blocks.page,
  }),
  {
    getLastBlocks,
    selectBlock,
    nextPage,
    previousPage,
    listenToNewBlocks,
  },
)(BlocksComponent);

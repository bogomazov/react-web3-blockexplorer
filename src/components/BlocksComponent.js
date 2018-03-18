import React, { Component } from "react";
import PropTypes from "prop-types";
import { Step, Segment, Menu, Transition } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getLastBlocks,
  nextPage,
  previousPage,
  listenToNewBlocks,
} from "../actions/blocks";
import { getVisibleBlocks } from "../selectors";

// Component which shows all blocks
class BlocksComponent extends Component {
  componentDidMount() {
    this.props.listenToNewBlocks();
  }

  render() {
    const { blocks, page, nextPage, previousPage, getLastBlocks } = this.props;
    const isLoading = blocks.length < 10;
    if (isLoading) getLastBlocks(); // If selected blocks are less than 10, this line will start fetching more block
    return (
      <>
        <Segment
          basic
          loading={isLoading}
          style={{ padding: "8em 0em", width: "100%" }}
          textAlign="center"
        >
          <Transition.Group
            as={Step.Group}
            duration={200}
            animation="fade"
            size="mini"
          >
            {blocks.map(block => (
              <Step link key={block.number} as={Link} to={`/${block.hash}`}>
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
          <Segment style={{ padding: "0em 8em" }} floated="right" basic>
            <Menu>
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
  getLastBlocks: PropTypes.func.isRequired,
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number.isRequired,
      transactions: PropTypes.arrayOf(PropTypes.string.isRequired),
    }),
  ).isRequired,
  listenToNewBlocks: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    blocks: getVisibleBlocks(state), // Use of selector
    page: state.blocks.page,
  }),
  {
    getLastBlocks,
    nextPage,
    previousPage,
    listenToNewBlocks,
  },
)(BlocksComponent);

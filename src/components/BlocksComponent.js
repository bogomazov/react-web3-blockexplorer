import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Step,
  Segment,
  Menu,
  Transition,
  Input,
  Image,
  Header,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "react-router-redux";
import _ from "lodash";
import blockies from "ethereum-blockies-png";
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

  debounceSearch = _.debounce(this.props.push, 300);

  render() {
    const {
      blocks,
      page,
      nextPage,
      previousPage,
      getLastBlocks,
      selectedBlock,
    } = this.props;
    const isLoading = blocks.length < 10;
    if (isLoading) getLastBlocks(); // If selected blocks are less than 10, this line will start fetching more block
    return (
      <>
        <Segment
          basic
          loading={isLoading}
          style={{ padding: "3em 0em", width: "100%" }}
          стили хардкодим в компонентах, ммм
          textAlign="center"
        >
          <Header size="huge">REACT-WEB3-BLOCKEXPLORER</Header>
          <Segment style={{ padding: "0em 12em" }} textAlign="right" basic>
            <Input
              type="number"
              icon="search"
              placeholder="Search for block..."
              onChange={(e, { value }) => this.debounceSearch(`/${value}`)}
            />
          </Segment>
          <Transition.Group
            as={Step.Group}
            duration={200}
            animation="fade"
            size="small"
          >
            {blocks.map(block => (
              <Step
                link
                key={block.number}
                as={Link}
                to={`/${block.number}`}
                active={selectedBlock && block.hash === selectedBlock.hash}
              >
                <Image
                  inline
                  rounded
                  src={blockies.createDataURL({ seed: block.hash })}
                />
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
          <Segment style={{ padding: "0em 11em" }} floated="right" basic>
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
  selectedBlock: PropTypes.shape({
    hash: PropTypes.string.isRequired,
  }),
  push: PropTypes.func.isRequired,
  это правильно, хоть и выглядит больно составлять для каждого такое, а что если архитектура через routing перестанет быть актуальной? :)
};

export default connect(
  state => ({
    blocks: getVisibleBlocks(state), // Use of selector
    page: state.blocks.page,
    selectedBlock: state.blocks.selectedBlock,
  }),
  {
    getLastBlocks,
    nextPage,
    previousPage,
    listenToNewBlocks,
    push,
    добавлять dispatch для каждого с ручным импортом и рефакторинг не находишь напряжным? :) на эту тему можно было бы подискутировать, но данное решение концептуально правильное
  },
)(BlocksComponent);

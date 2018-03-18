import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Header, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getBlock } from "../actions/blocks";

// Component which shows block information
class BlockInfoComponent extends Component {
  componentDidMount() {
    this.props.getBlock(this.props.match.params.block);
  }

  componentDidUpdate() {
    const { match, getBlock } = this.props;
    getBlock(match.params.block);
  }

  render() {
    const { block } = this.props;
    return (
      <>
        <Segment style={{ overflow: "auto", maxHeight: 550 }}>
          <Header as="h2" textAlign="center">
            Block #{block ? block.number : null}
          </Header>
          <Table compact size="small">
            <Table.Body>
              <Table.Row>
                <Table.Cell>Hash:</Table.Cell>
                <Table.Cell>{block ? block.hash : null}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Difficulty:</Table.Cell>
                <Table.Cell>{block ? block.difficulty : null}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Miner:</Table.Cell>
                <Table.Cell>{block ? block.miner : null}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Uncles:</Table.Cell>
                <Table.Cell>{block ? block.uncles.length : null}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Hash:</Table.Cell>
                <Table.Cell>{block ? block.hash : null}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>GasLimit:</Table.Cell>
                <Table.Cell>{block ? block.gasLimit : null}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>GasUsage:</Table.Cell>
                <Table.Cell>{block ? block.gasUsed : null}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Hash:</Table.Cell>
                <Table.Cell>{block ? block.hash : null}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Time:</Table.Cell>
                <Table.Cell>{block ? block.timestamp : null}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Size:</Table.Cell>
                <Table.Cell>{block ? block.size : null}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Extra:</Table.Cell>
                <Table.Cell>{block ? block.extraData : null}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Transactions:</Table.Cell>
                <Table.Cell>
                  {block ? (
                    <Link to={`/${block.hash}/transactions`}>
                      {block.transactions.length} (Click to show all)
                    </Link>
                  ) : null}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      </>
    );
  }
}

BlockInfoComponent.propTypes = {
  block: PropTypes.shape({
    hash: PropTypes.string.isRequired,
  }),
  getBlock: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      block: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(({ blocks }) => ({ block: blocks.selectedBlock }), {
  getBlock,
})(BlockInfoComponent);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Header, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

// Shows all transactions of the block
const TransactionsComponent = ({ block }) => {
  if (!block) return null;
  return (
    <div>
      <Segment style={{ overflow: "auto", maxHeight: 550 }}>
        <Header as="h2" textAlign="center">
          Transactions of Block #{block.number}
        </Header>
        <Table compact size="small">
          <Table.Body>
            {block.transactions.map(transaction => (
              <Table.Row key={transaction}>
                <Table.Cell>
                  <Link to={`/${block.hash}/transactions/${transaction}`}>
                    {transaction}
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    </div>
  );
};

TransactionsComponent.propTypes = {
  block: PropTypes.shape({
    transactions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    hash: PropTypes.string.isRequired,
  }),
};

export default connect(({ blocks }) => ({
  block: blocks.selectedBlock,
}))(TransactionsComponent);

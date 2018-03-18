import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Header, Table } from "semantic-ui-react";
import getTransactions from "../actions/transactions";

// Shows transaction details
class TransactionInfoComponent extends Component {
  componentDidMount() {
    this.props.getTransactions(this.props.match.params.transaction);
  }

  componentDidUpdate() {
    const { getTransactions, match } = this.props;
    getTransactions(match.params.transaction);
  }

  render() {
    const { transaction } = this.props;
    return (
      <>
        <Segment style={{ overflow: "auto", maxHeight: 550 }}>
          <Header as="h2" textAlign="center">
            {transaction
              ? `Transaction ${transaction.transactionIndex} of block #${
                  transaction.blockNumber
                }`
              : null}
          </Header>
          <Table compact size="small">
            <Table.Body>
              <Table.Row>
                <Table.Cell>From:</Table.Cell>
                <Table.Cell>{transaction ? transaction.from : null}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>To:</Table.Cell>
                <Table.Cell>{transaction ? transaction.to : null}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Value:</Table.Cell>
                <Table.Cell>
                  {transaction ? transaction.value : null}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Gas Price:</Table.Cell>
                <Table.Cell>
                  {transaction ? transaction.gasPrice : null}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Gas Used:</Table.Cell>
                <Table.Cell>{transaction ? transaction.gas : null}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      </>
    );
  }
}

TransactionInfoComponent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      transaction: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getTransactions: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    hash: PropTypes.string.isRequired,
  }),
};

export default connect(({ transaction }) => ({ transaction }), {
  getTransactions,
})(TransactionInfoComponent);

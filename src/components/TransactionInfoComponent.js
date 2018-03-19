import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Header, Table, Image } from "semantic-ui-react";
import blockies from "ethereum-blockies-png";
import getTransaction from "../actions/transactions";

// Shows transaction details
class TransactionInfoComponent extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.props.getTransaction(
      this.props.match.params.block,
      this.props.match.params.transaction,
    );
    this.state.loading = false;
  }

  componentWillUpdate({ match }) {
    const { transaction, match: prevMatch } = this.props;
    if (
      !transaction ||
      prevMatch.params.transaction !== match.params.transaction
    ) {
      this.state.loading = true;
    } else {
      this.state.loading = false;
    }
  }

  componentDidUpdate() {
    const { getTransaction, match } = this.props;
    if (this.state.loading) {
      getTransaction(match.params.block, match.params.transaction);
    }
  }

  render() {
    const { transaction } = this.props;
    return (
      <>
        <Segment
          loading={this.state.loading}
          style={{ overflow: "auto", maxHeight: 550 }}
        >
          <Header as="h2" textAlign="center">
            {transaction ? (
              <>
                <Image
                  inline
                  rounded
                  src={blockies.createDataURL({ seed: transaction.hash })}
                />
                Transaction {transaction.transactionIndex} of block #{
                  transaction.blockNumber
                }
              </>
            ) : null}
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
      block: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getTransaction: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    hash: PropTypes.string.isRequired,
  }),
};

export default connect(({ transaction }) => ({ transaction }), {
  getTransaction,
})(TransactionInfoComponent);

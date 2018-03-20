import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Header, Table, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import blockies from "ethereum-blockies-png";
молодец, что проверил и заюзал подобное решение
// Shows all transactions of the block
const TransactionsComponent = ({ block }) => {
  по наименованию, если разделять компоненты от контейнеров, можно было бы избежать длинных именований :)
  if (!block) return null;
  return (
    <div>
      <Segment style={{ overflow: "auto", maxHeight: 550 }}>
        <Header as="h2" textAlign="center">
          Transactions of Block #{block.number}
        </Header>
        <Table compact size="small">
          <Table.Body>
            {block.transactions.map((transaction, i) => (
              <Table.Row key={transaction}>
                <Table.Cell>
                  <Image
                    avatar
                    src={blockies.createDataURL({ seed: transaction })}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/${block.number}/transactions/${i}`}>
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

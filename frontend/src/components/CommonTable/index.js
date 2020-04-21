import React from 'react';
import PropTypes from 'prop-types';

import { Table, Pagination, Button } from './styles';

export default function CommonTable({ children, tableHeads, page, setPage }) {
  return (
    <>
      <Table>
        <thead>
          <tr>
            {tableHeads.map(tableHead => (
              <th key={tableHead}>{tableHead}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
      <Pagination>
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          type="button"
        >
          Anterior
        </Button>
        <Button
          disabled={children && children.length < 10}
          type="button"
          onClick={() => setPage(page + 1)}
        >
          Próximo
        </Button>
      </Pagination>
    </>
  );
}

CommonTable.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  tableHeads: PropTypes.arrayOf(PropTypes.string).isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

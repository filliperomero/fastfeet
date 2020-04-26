import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import CommonTable from '~/components/CommonTable';
import ProblemItem from './ProblemItem';

import api from '~/services/api';

import { Container, Content } from './styles';

export default function Problems({ location }) {
  const initialPage =
    qs.parse(location.search, { ignoreQueryPrefix: true }).page || 1;

  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(initialPage);

  const tableHeads = ['Encomenda', 'Problema', 'Ações'];

  async function loadProblems() {
    const response = await api.get('/delivery/problems', {
      params: {
        page,
      },
    });

    setProblems(response.data);
  }

  useEffect(() => {
    loadProblems();
  }, [page]); // eslint-disable-line

  return (
    <Container>
      <Content>
        <h1>Problemas na entrega</h1>
        <CommonTable tableHeads={tableHeads} page={page} setPage={setPage}>
          {problems.map(problem => (
            <ProblemItem
              key={problem.id}
              data={problem}
              updateProblems={loadProblems}
            />
          ))}
        </CommonTable>
      </Content>
    </Container>
  );
}

Problems.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

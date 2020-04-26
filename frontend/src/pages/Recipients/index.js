import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { MdAdd } from 'react-icons/md';

import SearchInput from '~/components/Form/SearchInput';
import CommonTable from '~/components/CommonTable';
import RecipientItem from './RecipientItem';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

export default function Recipients({ location }) {
  const initialPage =
    qs.parse(location.search, { ignoreQueryPrefix: true }).page || 1;

  const [recipients, setRecipients] = useState([]);
  const [page, setPage] = useState(initialPage);

  const tableHeads = ['ID', 'Nome', 'Endereço', 'Ações'];

  function formatRecipient(data) {
    return data.map(recipient => ({
      ...recipient,
      addressFormatted: `${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}`,
    }));
  }

  async function loadRecipients() {
    const response = await api.get('/recipients', {
      params: {
        page,
      },
    });

    setRecipients(formatRecipient(response.data));
  }

  async function handleSearch(event) {
    const response = await api.get('/recipients', {
      params: {
        q: event.target.value,
        page,
      },
    });

    setRecipients(formatRecipient(response.data));
  }

  useEffect(() => {
    loadRecipients();
  }, [page]); // eslint-disable-line

  return (
    <Container>
      <Content>
        <h1>Gerenciando destinatários</h1>
        <section>
          <SearchInput
            name="recipients"
            placeholder="Buscar por destinatários"
            onChange={handleSearch}
          />
          <button type="button" onClick={() => history.push('/recipient/add')}>
            <MdAdd size={24} color="#fff" />
            CADASTRAR
          </button>
        </section>
        <CommonTable tableHeads={tableHeads} page={page} setPage={setPage}>
          {recipients.map(recipient => (
            <RecipientItem
              key={recipient.id}
              data={recipient}
              updateRecipients={loadRecipients}
            />
          ))}
        </CommonTable>
      </Content>
    </Container>
  );
}

Recipients.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

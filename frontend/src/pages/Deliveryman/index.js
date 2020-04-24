import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { MdAdd } from 'react-icons/md';

import SearchInput from '~/components/Form/SearchInput';
import CommonTable from '~/components/CommonTable';
import DeliverymanItem from './DeliverymanItem';

import api from '~/services/api';
import history from '~/services/history';
import { formatNameInitials } from '~/util/format';

import { Container, Content } from './styles';

export default function Deliverymen({ location }) {
  const initialPage =
    qs.parse(location.search, { ignoreQueryPrefix: true }).page || 1;

  const [deliverymen, setDeliverymen] = useState([]);
  const [page, setPage] = useState(initialPage);

  const tableHeads = ['ID', 'Foto', 'Nome', 'Email', 'Ações'];

  function formatDeliverymen(data) {
    return data.map(deliveryman => ({
      ...deliveryman,
      nameInitials: formatNameInitials(deliveryman.name),
    }));
  }

  async function loadDeliverymen() {
    const response = await api.get('/deliveryman', {
      params: {
        page,
      },
    });

    const formattedResponse = formatDeliverymen(response.data);
    setDeliverymen(formattedResponse);
  }

  async function handleSearch(event) {
    const response = await api.get('/deliveryman', {
      params: {
        q: event.target.value,
        page,
      },
    });

    const formattedResponse = formatDeliverymen(response.data);
    setDeliverymen(formattedResponse);
  }

  useEffect(() => {
    loadDeliverymen();
  }, [page]); // eslint-disable-line

  return (
    <Container>
      <Content>
        <h1>Gerenciando entregadores</h1>
        <section>
          <SearchInput
            name="deliverymen"
            placeholder="Buscar por entregadores"
            onChange={handleSearch}
          />
          <button
            type="button"
            onClick={() => history.push('/deliveryman/add')}
          >
            <MdAdd size={24} color="#fff" />
            CADASTRAR
          </button>
        </section>
        <CommonTable tableHeads={tableHeads} page={page} setPage={setPage}>
          {deliverymen.map(deliveryman => (
            <DeliverymanItem
              key={deliveryman.id}
              data={deliveryman}
              updateDeliverymen={loadDeliverymen}
            />
          ))}
        </CommonTable>
      </Content>
    </Container>
  );
}

Deliverymen.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

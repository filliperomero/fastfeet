import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { MdAdd } from 'react-icons/md';

import SearchInput from '~/components/Form/SearchInput';
import DeliveryItem from './DeliveryItem';
import CommonTable from '~/components/CommonTable';

import api from '~/services/api';
import history from '~/services/history';
import { formatDate, formatStatus, formatNameInitials } from '~/util/format';

import { Container, Content } from './styles';

export default function Delivery({ location }) {
  const initialPage =
    qs.parse(location.search, { ignoreQueryPrefix: true }).page || 1;

  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(initialPage);

  const tableHeads = [
    'ID',
    'Destinatário',
    'Entregador',
    'Cidade',
    'Estado',
    'Status',
    'Ações',
  ];

  function formatDeliveries(data) {
    return data.map(delivery => ({
      ...delivery,
      start_date_formatted: formatDate(delivery.start_date),
      end_date_formatted: formatDate(delivery.end_date),
      status: formatStatus(delivery),
      nameInitials: formatNameInitials(delivery.deliveryman.name),
    }));
  }

  async function loadDeliveries() {
    const response = await api.get('/deliveries', {
      params: {
        page,
      },
    });

    const formattedResponse = formatDeliveries(response.data);

    setDeliveries(formattedResponse);
  }

  async function handleSearch(event) {
    const response = await api.get('/deliveries', {
      params: {
        q: event.target.value,
        page,
      },
    });

    const formattedResponse = formatDeliveries(response.data);

    setDeliveries(formattedResponse);
  }

  useEffect(() => {
    loadDeliveries();
  }, [page]); // eslint-disable-line

  return (
    <Container>
      <Content>
        <h1>Gerenciando encomendas</h1>
        <section>
          <SearchInput
            name="deliveries"
            placeholder="Buscar por encomendas"
            onChange={handleSearch}
          />
          <button type="button" onClick={() => history.push('/delivery/add')}>
            <MdAdd size={24} color="#fff" />
            CADASTRAR
          </button>
        </section>
        <CommonTable tableHeads={tableHeads} page={page} setPage={setPage}>
          {deliveries.map(delivery => (
            <DeliveryItem
              key={delivery.id}
              data={delivery}
              updateDeliveries={loadDeliveries}
            />
          ))}
        </CommonTable>
      </Content>
    </Container>
  );
}

Delivery.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';

import MoreOptionsPopup from '~/components/MoreOptionsPopup';
import DeliveryStatus from './DeliveryStatus';
import DeliveryInformationModal from './DeliveryInformationModal';

import history from '~/services/history';
import api from '~/services/api';
import { formatErrorAPI } from '~/util/format';

import { DeliveryOptionsContainer, Deliveryman } from './styles';

export default function DeliveryItem({ data, updateDeliveries }) {
  const statusColors = {
    entregue: {
      background: '#DFF0DF',
      color: '#2CA42B',
    },
    cancelada: {
      background: '#FAB0B0',
      color: '#DE3B3B',
    },
    pendente: {
      background: '#F0F0DF',
      color: '#C1BC35',
    },
    retirada: {
      background: '#BAD2FF',
      color: '#4D85EE',
    },
  };

  async function handleDelete() {
    const confirm = window.confirm(
      'Você tem certeza que deseja deletar essa encomenda?'
    );

    if (!confirm) {
      toast.error('Encomenda não deletado!');
      return;
    }

    try {
      await api.delete(`/deliveries/${data.id}`);
      updateDeliveries();
      toast.success('Delivery deleted successfully');
    } catch (error) {
      toast.error(formatErrorAPI(error));
    }
  }

  return (
    <tr>
      <td>#{data.id}</td>
      <td>{data.recipient.name}</td>
      <Deliveryman background="#FFEEF1" color="#CC7584">
        <span>{data.nameInitials}</span>
        {data.deliveryman.name}
      </Deliveryman>
      <td>{data.recipient.city}</td>
      <td>{data.recipient.state}</td>
      <td>
        <DeliveryStatus
          color={statusColors[data.status.toLowerCase()].color}
          background={statusColors[data.status.toLowerCase()].background}
          text={data.status}
        />
      </td>
      <td>
        <MoreOptionsPopup>
          <DeliveryOptionsContainer>
            <DeliveryInformationModal data={data} />
            <button
              type="button"
              onClick={() => history.push(`/delivery/edit/${data.id}`)}
            >
              <MdModeEdit size={18} color="#4D85EE" />
              <span>Editar</span>
            </button>
            <button type="button" onClick={handleDelete}>
              <MdDeleteForever size={18} color="#DE3B3B" />
              <span>Excluir</span>
            </button>
          </DeliveryOptionsContainer>
        </MoreOptionsPopup>
      </td>
    </tr>
  );
}

DeliveryItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    recipient: PropTypes.shape({
      name: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    deliveryman: PropTypes.shape({
      name: PropTypes.string,
    }),
    status: PropTypes.string,
    nameInitials: PropTypes.string,
  }).isRequired,
  updateDeliveries: PropTypes.func.isRequired,
};

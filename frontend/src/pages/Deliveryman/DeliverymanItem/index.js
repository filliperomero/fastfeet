import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';

import history from '~/services/history';
import api from '~/services/api';
import { formatErrorAPI } from '~/util/format';

import MoreOptionsPopup from '~/components/MoreOptionsPopup';

import { DeliveryOptionsContainer, NameInitials, Avatar } from './styles';

export default function DeliverymanItem({ data, updateDeliverymen }) {
  async function handleDelete() {
    const confirm = window.confirm(
      'Você tem certeza que deseja deletar esse entregador?'
    );

    if (!confirm) {
      toast.error('Entregador não deletado!');
      return;
    }

    try {
      await api.delete(`/deliveryman/${data.id}`);
      updateDeliverymen();
      toast.success('Deliveryman deleted successfully');
    } catch (error) {
      toast.error(formatErrorAPI(error));
    }
  }

  return (
    <tr>
      <td>#{data.id}</td>
      {data.avatar !== null ? (
        <Avatar>
          <img src={data.avatar.url} alt="data.name" />
        </Avatar>
      ) : (
        <NameInitials background="#FFEEF1" color="#CC7584">
          <span>{data.nameInitials}</span>
        </NameInitials>
      )}
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>
        <MoreOptionsPopup>
          <DeliveryOptionsContainer>
            <button
              type="button"
              onClick={() => history.push(`/deliveryman/edit/${data.id}`)}
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

DeliverymanItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    nameInitials: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string,
      path: PropTypes.string,
      id: PropTypes.number,
    }),
  }).isRequired,
  updateDeliverymen: PropTypes.func.isRequired,
};

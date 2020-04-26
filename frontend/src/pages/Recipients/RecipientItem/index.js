import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';

import history from '~/services/history';
import api from '~/services/api';
import { formatErrorAPI } from '~/util/format';

import MoreOptionsPopup from '~/components/MoreOptionsPopup';

import { DeliveryOptionsContainer } from './styles';

export default function RecipientItem({ data, updateRecipients }) {
  async function handleDelete() {
    const confirm = window.confirm(
      'Você tem certeza que deseja deletar esse destinatário?'
    );

    if (!confirm) {
      toast.error('Destinatário não deletado!');
      return;
    }

    try {
      await api.delete(`/recipients/${data.id}`);
      updateRecipients();
      toast.success('Recipient deleted successfully');
    } catch (error) {
      toast.error(formatErrorAPI(error));
    }
  }

  return (
    <tr>
      <td>#{data.id}</td>
      <td>{data.name}</td>
      <td>{data.addressFormatted}</td>
      <td>
        <MoreOptionsPopup>
          <DeliveryOptionsContainer>
            <button
              type="button"
              onClick={() => history.push(`/recipient/edit/${data.id}`)}
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

RecipientItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    addressFormatted: PropTypes.string,
  }).isRequired,
  updateRecipients: PropTypes.func.isRequired,
};

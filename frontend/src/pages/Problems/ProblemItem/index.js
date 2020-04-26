import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdDeleteForever } from 'react-icons/md';

import api from '~/services/api';
import { formatErrorAPI } from '~/util/format';

import MoreOptionsPopup from '~/components/MoreOptionsPopup';
import ProblemDescriptionModal from './ProblemDescriptionModal';

import { DeliveryOptionsContainer } from './styles';

export default function ProblemItem({ data, updateProblems }) {
  async function handleCancel() {
    const confirm = window.confirm(
      'Você tem certeza que deseja cancelar esta encomenda?'
    );

    if (!confirm) {
      toast.error('Encomenda não cancelada!');
      return;
    }

    try {
      await api.delete(`/problem/${data.id}/cancel-delivery`);
      updateProblems();
      toast.success('Delivery canceled successfully');
    } catch (error) {
      toast.error(formatErrorAPI(error));
    }
  }

  return (
    <tr>
      <td>#{data.id}</td>
      <td>{data.description}</td>
      <td>
        <MoreOptionsPopup
          customStyle={{
            width: '210px',
            borderRadius: '4px',
            boxShadow: '0 0 2px rgba(0, 0, 0, .15)',
            border: 0,
          }}
        >
          <DeliveryOptionsContainer>
            <ProblemDescriptionModal data={data} />
            <button type="button" onClick={handleCancel}>
              <MdDeleteForever size={18} color="#DE3B3B" />
              <span>Cancelar Encomenda</span>
            </button>
          </DeliveryOptionsContainer>
        </MoreOptionsPopup>
      </td>
    </tr>
  );
}

ProblemItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  updateProblems: PropTypes.func.isRequired,
};

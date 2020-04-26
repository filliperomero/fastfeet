import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { MdRemoveRedEye } from 'react-icons/md';

import { Content } from './styles';

export default function ProblemDescriptionModal({ data }) {
  return (
    <Popup
      trigger={
        <button type="button">
          <MdRemoveRedEye size={18} color="#8E5BE8" />
          <span>Visualizar</span>
        </button>
      }
      modal
      closeOnDocumentClick
      contentStyle={{
        maxWidth: '450px',
        padding: '0',
        borderRadius: '4px',
        boxShadow: '0 0 10px rgba(0, 0, 0, .20)',
        border: 0,
      }}
    >
      <Content>
        <h2>VISUALIZAR PROBLEMA</h2>
        <p>{data.description}</p>
      </Content>
    </Popup>
  );
}

ProblemDescriptionModal.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
};

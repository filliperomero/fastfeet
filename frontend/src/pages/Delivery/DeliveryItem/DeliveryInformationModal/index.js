import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { MdRemoveRedEye } from 'react-icons/md';

import { Content } from './styles';

export default function DeliveryInformationModal({ data }) {
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
        <section>
          <strong>Informações da encomenda</strong>
          <p>
            {data.recipient.street}, {data.recipient.number}
          </p>
          <p>
            {data.recipient.city} - {data.recipient.state}
          </p>
          <p>{data.recipient.zipCode}</p>
        </section>
        <section>
          <strong>Datas</strong>
          <p>
            <strong>Retirada: </strong>
            {data.start_date_formatted}
          </p>
          <p>
            <strong>Entrega: </strong> {data.end_date_formatted}
          </p>
        </section>
        <section>
          <strong>Assinatura do destinatário</strong>
          {data.signature && <img src={data.signature.url} alt="Signature" />}
        </section>
      </Content>
    </Popup>
  );
}

DeliveryInformationModal.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    start_date: PropTypes.string,
    start_date_formatted: PropTypes.string,
    end_date: PropTypes.string,
    end_date_formatted: PropTypes.string,
    recipient: PropTypes.shape({
      name: PropTypes.string,
      street: PropTypes.string,
      number: PropTypes.number,
      city: PropTypes.string,
      state: PropTypes.string,
      zipCode: PropTypes.string,
    }),
    deliveryman: PropTypes.shape({
      name: PropTypes.string,
    }),
    signature: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};

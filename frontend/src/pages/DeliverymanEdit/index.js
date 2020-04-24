import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import AvatarInput from '~/components/AvatarInput';
import DefaultForm from '~/components/DefaultForm';
import UnformInput from '~/components/Form/UnformInput';
import { formatErrorAPI } from '~/util/format';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

export default function DeliverymanEdit({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  useEffect(() => {
    async function loadInitialData(deliveryId) {
      if (id) {
        const res = await api.get(`/deliveryman/${deliveryId}`);

        formRef.current.setData(res.data);
        formRef.current.setFieldValue('avatar_id', res.data.avatar);
      }
    }
    loadInitialData(id);
  }, [id]);

  async function handleSubmit(data) {
    try {
      // Add Validation using Yup
      await api.put(`/deliveryman/${id}`, data);

      history.push('/deliverymen');
      toast.success('Deliveryman updated successfully!');
    } catch (error) {
      toast.error(formatErrorAPI(error));
    }
  }

  return (
    <Container>
      <Content>
        <DefaultForm
          headerTitle="Edição de entregadores"
          formRef={formRef}
          handleSubmit={handleSubmit}
        >
          <AvatarInput name="avatar_id" />
          <UnformInput
            name="name"
            label="Nome"
            type="text"
            placeholder="John Doe"
          />
          <UnformInput
            name="email"
            label="Email"
            type="email"
            placeholder="example@fastfeet.com"
          />
        </DefaultForm>
      </Content>
    </Container>
  );
}

DeliverymanEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

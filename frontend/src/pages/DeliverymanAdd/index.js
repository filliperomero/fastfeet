import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import AvatarInput from '~/components/AvatarInput';
import DefaultForm from '~/components/DefaultForm';
import UnformInput from '~/components/Form/UnformInput';
import { formatErrorAPI } from '~/util/format';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

export default function DeliverymanAdd() {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      // TODO: Precisa realizar validacoes
      await api.post('/deliveryman', data);
      history.push('/deliverymen');
      toast.success('Deliveryman created successfully');
    } catch (error) {
      toast.error(formatErrorAPI(error));
    }
  }

  return (
    <Container>
      <Content>
        <DefaultForm
          headerTitle="Cadastro de entregadores"
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

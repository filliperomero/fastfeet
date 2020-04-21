import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import DefaultForm from '~/components/DefaultForm';
import UnformInput from '~/components/Form/UnformInput';
import UnformAsyncSelect from '~/components/Form/UnformAsyncSelect';
import { formatErrorAPI } from '~/util/format';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

export default function DeliveryAdd() {
  const formRef = useRef(null);

  async function loadRecipients(inputValue, callback) {
    const res = await api.get('/recipients', { params: { q: inputValue } });

    const data = res.data.map(recipient => ({
      value: recipient.id,
      label: recipient.name,
    }));

    callback(data);
  }

  async function loadDeliverymen(inputValue, callback) {
    const res = await api.get('/deliveryman', { params: { q: inputValue } });

    const data = res.data.map(deliveryman => ({
      value: deliveryman.id,
      label: deliveryman.name,
    }));

    callback(data);
  }

  async function handleSubmit(data) {
    try {
      // TODO: Precisa realizar validacoes
      await api.post('/deliveries', data);
      history.push('/deliveries');
      toast.success('Delivery created successfully');
    } catch (error) {
      toast.error(formatErrorAPI(error));
    }
  }

  return (
    <Container>
      <Content>
        <DefaultForm
          headerTitle="Cadastro de encomendas"
          formRef={formRef}
          handleSubmit={handleSubmit}
        >
          <section>
            <UnformAsyncSelect
              type="text"
              label="Destinatário"
              name="recipient_id"
              placeholder="Destinatários"
              noOptionsMessage={() => 'Nenhum destinatário encontrado'}
              loadOptions={loadRecipients}
            />

            <UnformAsyncSelect
              type="text"
              label="Entregador"
              name="deliveryman_id"
              placeholder="Entregadores"
              noOptionsMessage={() => 'Nenhum entregador encontrado'}
              loadOptions={loadDeliverymen}
            />
          </section>

          <UnformInput
            name="product"
            label="Nome do produto"
            type="text"
            placeholder="Nome do produto"
          />
        </DefaultForm>
      </Content>
    </Container>
  );
}

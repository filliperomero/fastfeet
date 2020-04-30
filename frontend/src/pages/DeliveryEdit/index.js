import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import DefaultForm from '~/components/DefaultForm';
import UnformInput from '~/components/Form/UnformInput';
import UnformAsyncSelect from '~/components/Form/UnformAsyncSelect';
import { formatErrorAPI } from '~/util/format';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

export default function DeliveryEdit({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  useEffect(() => {
    async function loadInitialData(deliveryId) {
      if (id) {
        const res = await api.get(`/deliveries/${deliveryId}`);

        formRef.current.setData(res.data);
        formRef.current.setFieldValue('recipient_id', {
          value: res.data.recipient.id,
          label: res.data.recipient.name,
        });
        formRef.current.setFieldValue('deliveryman_id', {
          value: res.data.deliveryman.id,
          label: res.data.deliveryman.name,
        });
      }
    }
    loadInitialData(id);
  }, [id]);

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

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});
    try {
      const schema = Yup.object().shape({
        recipient_id: Yup.string().required('Destinatário obrigatório'),
        deliveryman_id: Yup.string().required('Entregador obrigatório'),
        product: Yup.string().required('Descrição do produto é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put(`/deliveries/${id}`, data);

      reset();
      history.push('/deliveries');
      toast.success('Delivery updated successfully!');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(err => {
          errorMessages[err.path] = err.message;
        });

        formRef.current.setErrors(errorMessages);
      } else {
        toast.error(formatErrorAPI(error));
      }
    }
  }

  return (
    <Container>
      <Content>
        <DefaultForm
          headerTitle="Edição de encomendas"
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

DeliveryEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

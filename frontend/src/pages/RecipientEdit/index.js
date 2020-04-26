import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import DefaultForm from '~/components/DefaultForm';
import UnformInput from '~/components/Form/UnformInput';
import UnformMaskInput from '~/components/Form/UnformMaskInput';
import { formatErrorAPI } from '~/util/format';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

export default function RecipientEdit({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      // TODO: Precisa realizar validacoes

      await api.put(`/recipients/${id}`, data);
      history.push('/recipients');
      toast.success('Recipient updated successfully');
    } catch (error) {
      toast.error(formatErrorAPI(error));
    }
  }

  useEffect(() => {
    async function loadInitialData(deliveryId) {
      const res = await api.get(`/recipients/${deliveryId}`);

      formRef.current.setData(res.data);
    }
    loadInitialData(id);
  }, [id]);

  return (
    <Container>
      <Content>
        <DefaultForm
          headerTitle="Edição de destinatários"
          formRef={formRef}
          handleSubmit={handleSubmit}
        >
          <section>
            <UnformInput
              name="name"
              label="Nome"
              type="text"
              placeholder="John Doe"
            />
          </section>

          <section>
            <UnformInput
              name="street"
              label="Rua"
              type="text"
              placeholder="Rua Um"
            />

            <UnformInput
              name="number"
              label="Número"
              type="number"
              placeholder="1234"
            />

            <UnformInput
              name="complement"
              label="Complemento"
              type="text"
              placeholder=""
            />
          </section>

          <section>
            <UnformInput
              name="city"
              label="Cidade"
              type="text"
              placeholder="City"
            />

            <UnformInput
              name="state"
              label="Estado"
              type="text"
              placeholder="State"
            />

            <UnformMaskInput
              name="zipCode"
              label="CEP"
              mask="99999-999"
              maskChar=""
              placeholder="_____-___"
            />
          </section>
        </DefaultForm>
      </Content>
    </Container>
  );
}

RecipientEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

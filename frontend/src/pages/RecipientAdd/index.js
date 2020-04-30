import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import DefaultForm from '~/components/DefaultForm';
import UnformInput from '~/components/Form/UnformInput';
import UnformMaskInput from '~/components/Form/UnformMaskInput';
import { formatErrorAPI } from '~/util/format';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

export default function RecipientAdd() {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    formRef.current.setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        street: Yup.string().required('Rua obrigatório'),
        number: Yup.string().required('Número obrigatório'),
        complement: Yup.string().required('Complemento obrigatório'),
        city: Yup.string().required('Cidade obrigatório'),
        state: Yup.string().required('Estado obrigatório'),
        zipCode: Yup.string().required('CEP obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/recipients', data);
      history.push('/recipients');
      toast.success('Recipient created successfully');
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
          headerTitle="Cadastro de destinatários"
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
              placeholder="_____-___"
              type="text"
            />
          </section>
        </DefaultForm>
      </Content>
    </Container>
  );
}

import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

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
    formRef.current.setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .email('Obrigatório ser um e-mail válido')
          .required('Email obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/deliveryman', data);
      history.push('/deliverymen');
      toast.success('Deliveryman created successfully');
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

import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import UnformInput from '~/components/Form/UnformInput';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const formRef = useRef();

  async function handleSubmit({ email, password }) {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('E-mail obrigatório'),
        password: Yup.string()
          .min(6, 'Senha deve conter no mínimo 6 caracteres')
          .required('Senha obrigatória'),
      });

      await schema.validate(
        { email, password },
        {
          abortEarly: false,
        }
      );

      dispatch(signInRequest(email, password));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <strong>SEU E-MAIL</strong>
        <UnformInput
          name="email"
          type="email"
          placeholder="exemplo@email.com"
        />

        <strong>SUA SENHA</strong>
        <UnformInput name="password" type="password" placeholder="******" />

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}

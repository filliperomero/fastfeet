import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';

import UnformInput from '~/components/Form/UnformInput';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />
      <Form onSubmit={handleSubmit}>
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

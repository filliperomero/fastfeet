import React from 'react';
import PropTypes from 'prop-types';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

import history from '~/services/history';

import { Content, BackButton, SaveButton } from './styles';

export default function Header({ title, handleSave }) {
  return (
    <Content>
      <h1>{title}</h1>
      <div>
        <BackButton type="button" onClick={() => history.goBack()}>
          <MdKeyboardArrowLeft size={18} color="#fff" />
          VOLTAR
        </BackButton>
        <SaveButton type="button" onClick={handleSave}>
          <MdDone size={18} color="#fff" />
          SALVAR
        </SaveButton>
      </div>
    </Content>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
};

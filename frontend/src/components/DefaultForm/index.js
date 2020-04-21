import React from 'react';
import PropTypes from 'prop-types';

import HeaderForm from '~/components/Form/Header';

import { UnForm } from './styles';

export default function DefaultForm({
  children,
  formRef,
  handleSubmit,
  headerTitle,
}) {
  return (
    <>
      <HeaderForm
        title={headerTitle}
        handleSave={() => formRef.current.submitForm()}
      />
      <UnForm ref={formRef} onSubmit={handleSubmit}>
        {children}
      </UnForm>
    </>
  );
}

DefaultForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.func,
  ]).isRequired,
  formRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  headerTitle: PropTypes.string.isRequired,
};

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

export default function UnformInput({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}

UnformInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

UnformInput.defaultProps = {
  label: undefined,
};

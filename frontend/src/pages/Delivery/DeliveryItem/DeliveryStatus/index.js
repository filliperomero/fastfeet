import React from 'react';
import PropTypes from 'prop-types';
import { MdFiberManualRecord } from 'react-icons/md';

import { Container, Content } from './styles';

export default function DeliveryStatus({ color, background, text }) {
  return (
    <Container>
      <Content color={color} background={background}>
        <MdFiberManualRecord color={color} size={15} />
        <strong>{text}</strong>
      </Content>
    </Container>
  );
}

DeliveryStatus.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
};

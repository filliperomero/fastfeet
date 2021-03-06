import React from 'react';
import { MdSearch } from 'react-icons/md';

import { Container } from './styles';

export default function SearchInput({ ...rest }) {
  return (
    <Container>
      <MdSearch size={18} color="#999" />
      <input type="text" {...rest} />
    </Container>
  );
}

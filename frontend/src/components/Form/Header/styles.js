import styled from 'styled-components';
import { darken } from 'polished';

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 24px;
    color: #444;
  }

  div {
    display: flex;
  }

  button {
    color: #fff;
    font-weight: bold;
    margin-left: 15px;
    padding: 10px 16px;
    border-radius: 4px;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    svg {
      margin-right: 5px;
    }
  }
`;

export const BackButton = styled.button`
  background: #ccc;

  &:hover {
    background: ${darken(0.06, '#ccc')};
  }
`;

export const SaveButton = styled.button`
  background: #7d40e7;

  &:hover {
    background: ${darken(0.06, '#7d40e7')};
  }
`;

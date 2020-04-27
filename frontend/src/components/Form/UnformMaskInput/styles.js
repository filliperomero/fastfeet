import styled from 'styled-components';
import ReactInputMask from 'react-input-mask';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    margin: 15px 0 10px 0;
    font-weight: bold;
    color: #444;
  }
`;

export const InputMask = styled(ReactInputMask)`
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  padding: 12px 15px;
  font-size: 16px;

  &::placeholder {
    color: #999;
  }
`;

export const Error = styled.span`
  color: #de3b3b;
  margin-bottom: 5px;
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 240px;
  height: 36px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;

  input {
    border: 0;
    background: transparent;
    width: 100%;
    margin-left: 5px;

    &::placeholder {
      color: #999;
    }
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin: 15px 0 10px 0;
    font-weight: bold;
    color: #444;
  }

  input {
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    padding: 12px 15px;
    font-size: 16px;

    &::placeholder {
      color: #999;
    }
  }
`;

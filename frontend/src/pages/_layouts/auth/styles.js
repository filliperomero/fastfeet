import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  background: #fff;
  padding: 60px 30px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 40px;

    strong {
      text-align: left;
      margin-bottom: 10px;
    }

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 12px 15px;
      margin-bottom: 15px;

      &:placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    button {
      background: #7d40e7;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      padding: 12px 0px;
      border-radius: 4px;

      &:hover {
        background: ${darken(0.06, '#7d40e7')};
      }
    }
  }
`;

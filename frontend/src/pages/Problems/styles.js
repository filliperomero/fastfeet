import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #f5f5f5;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 35px auto 0 auto;
  padding-bottom: 35px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 35px;
  }

  section {
    display: flex;
    justify-content: space-between;

    button {
      padding: 4px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0;
      border-radius: 4px;
      background: #7d40e7;
      color: #fff;
      font-weight: bold;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, '#7d40e7')};
      }
    }
  }
`;

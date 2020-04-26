import styled from 'styled-components';

export const Container = styled.div`
  background: #f5f5f5;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 30px auto;

  form {
    section {
      display: flex;

      div + div {
        margin-left: 15px;
      }

      &:nth-child(2) {
        div {
          flex-grow: 1;
          flex-basis: 0;
        }

        div:first-child {
          flex-grow: 2;
          flex-basis: 0;
        }
      }
    }
  }
`;

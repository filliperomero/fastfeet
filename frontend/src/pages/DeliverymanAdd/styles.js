import styled from 'styled-components';

export const Container = styled.div`
  background: #f5f5f5;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 30px auto;

  form section {
    display: flex;
    justify-content: space-between;

    > div:first-child {
      margin-right: 30px;
    }
  }
`;

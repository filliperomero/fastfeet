import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;

  section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 12px 0;

    strong {
      color: #444;
    }

    p {
      font-size: 16px;
      color: #666;
      line-height: 26px;

      strong {
        font-size: 16px;
        color: #666;
      }
    }

    &:first-child {
      border-bottom: 1px solid #eeeeee;
    }

    &:last-child {
      border-top: 1px solid #eeeeee;
    }

    img {
      margin: 20px auto;
    }
  }
`;

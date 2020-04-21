import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => props.background};
  height: 25px;
  padding: 5px 10px 5px 5px;
  border-radius: 15px;

  svg {
    margin-right: 5px;
  }

  strong {
    font-size: 14px;
    color: ${(props) => props.color};
  }
`;

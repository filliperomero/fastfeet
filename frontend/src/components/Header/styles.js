import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  padding: 0 30px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  height: 64px;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
  }

  img {
    max-width: 135px;
    margin-right: 30px;
  }
`;

export const Navigation = styled.div`
  padding-left: 30px;
  border-left: 1px solid #ddd;

  a {
    color: #999;
    font-size: 15px;
    font-weight: bold;
    margin-right: 20px;
    transition: color 0.2s;

    &.active,
    &:hover {
      color: #444;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  button {
    border: 0;
    color: #de3b3b;
  }
`;

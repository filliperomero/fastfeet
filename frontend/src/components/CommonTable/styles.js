import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Table = styled.table`
  text-align: left;
  border-spacing: 0 20px;
  border-collapse: separate;
  height: 57px;
  font-size: 16px;

  thead tr th:first-child {
    padding: 0 0 0 25px;
  }

  thead tr th:last-child {
    text-align: right;
    padding: 0 15px 0 0;
  }

  tbody {
    background: #fff;
    color: #666;
  }

  tbody tr td {
    padding: 20px 0 15px 0;
  }

  tbody tr td:first-child {
    padding: 20px 0 15px 25px;
    border-radius: 4px 0 0 4px;
  }

  tbody tr td:last-child {
    padding: 20px 25px 15px 0;
    border-radius: 0 4px 4px 0;
    text-align: right;
  }
`;

export const Pagination = styled.div`
  display: flex;
  margin: 0 auto;
`;

export const Button = styled.button`
  padding: 4px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  border: 0;
  border-radius: 4px;
  background: #7d40e7;
  color: #fff;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.06, '#7d40e7')};
  }

  &:disabled {
    background: ${lighten(0.2, '#7d40e7')};
  }
`;

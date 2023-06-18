import styled from 'styled-components';

export const ErrorText = styled.p`
  margin-top: 4px;
  padding: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondaryText};
  background-color: #fafab5;
  border: 1px solid #e3e342;
  border-radius: 8px;
`;

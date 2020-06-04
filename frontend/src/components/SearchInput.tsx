import styled from 'react-emotion';
import { COLORS } from '../constants';

export const SearchInput = styled('input')`
  font-size: 3em;
  border: 2px solid ${COLORS.GREY};
  padding: 0.4em;
  color: ${COLORS.DARK};
  outline: 0;
  width: 100%;
  max-width: 800px;
  transition: font-size ease 300ms;

  .SearchApp--search & {
    font-size: 1.4em;
  }

  &:focus {
    border-color: ${COLORS.LIGHT_TEAL};
  }
`;

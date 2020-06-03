import React from 'react';
import styled, {css} from "react-emotion";
import {COLORS, SIZES} from "../constants";
import {FilterMap} from "../types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

const listStyles = css({
  '@media (min-width: 768px)': {
    display: 'flex',
  },
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'none',
  justifyContent: "center",
  '& li ': {
    padding: SIZES.E3,
  }
});

const svgStyle = css`
  padding-left: 5px;
`;

const Button = styled('button')<{ active: boolean }>(({ active }) => ({
  padding: '5px',
  width: '150px',
  cursor: 'pointer',
  color: active ? COLORS.TEAL : COLORS.PURPLE,
  backgroundColor: 'transparent',
  borderBottom: `3px solid ${COLORS.PURPLE}`,
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  fontSize: SIZES.E3,
}));

interface FilteringProps {
  filters: {
    [key: string]: string;
  };
  filterMap: FilterMap;
  toggle(key: string): void;
}


export const Filtering: React.SFC<FilteringProps> = ({ filters, filterMap, toggle }) => (
  <ul className={listStyles}>
    {Object.keys(filters).map((key) => (
      <li key={key}>
        <Button onClick={() => toggle(key)} active={filterMap[key]} type="button">
          {filters[key]}
          {filterMap[key]? <FontAwesomeIcon className={svgStyle} color={COLORS.TEAL} icon={faCheck} /> : <FontAwesomeIcon className={svgStyle} color="red" icon={faTimes} />}
        </Button>
      </li>
    ))}
  </ul>
)

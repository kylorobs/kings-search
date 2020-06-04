import React from 'react';
import { SearchResultItem } from './SearchResultItem';
import { Container } from './SearchResults';
import styled from 'react-emotion';
import { getForm } from '../utils';
import {COLORS, SIZES} from '../constants';

const AreaTitle = styled('h2')`
  text-align: left;
  font-size: ${SIZES.E3};
  color: ${COLORS.DARK};
`;

const HLContainer = styled('div')`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 80px;
    pointer-events: none;
    background: linear-gradient(
      to right,
      hsla(0, 0%, 100%, 0) 0%,
      hsla(0, 0%, 100%, 0.013) 8.1%,
      hsla(0, 0%, 100%, 0.049) 15.5%,
      hsla(0, 0%, 100%, 0.104) 22.5%,
      hsla(0, 0%, 100%, 0.175) 29%,
      hsla(0, 0%, 100%, 0.259) 35.3%,
      hsla(0, 0%, 100%, 0.352) 41.2%,
      hsla(0, 0%, 100%, 0.45) 47.1%,
      hsla(0, 0%, 100%, 0.55) 52.9%,
      hsla(0, 0%, 100%, 0.648) 58.8%,
      hsla(0, 0%, 100%, 0.741) 64.7%,
      hsla(0, 0%, 100%, 0.825) 71%,
      hsla(0, 0%, 100%, 0.896) 77.5%,
      hsla(0, 0%, 100%, 0.951) 84.5%,
      hsla(0, 0%, 100%, 0.987) 91.9%,
      hsl(0, 0%, 100%) 100%
    );
  }
`;

const HList = styled('ul')`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  margin: 0;
  position: relative;
  padding: 0;
  list-style-type: none;
  height: 180px;
  overflow-y: hidden;

  li {
    margin-right: ${SIZES.E3};
    list-style: none;

    &:last-child {
      padding-right: 0px;
    }
  }
`;

interface MobileSearchResultsProps {
  data: any;
}

const itemRenderer = (data: any, id: string) => (
  <SearchResultItem
    key={id}
    title={data.results[id].title}
    link={data.results[id].link}
    description={data.results[id].description}
    form={getForm(data.results[id])}
  />
);

export const MobileSearchResults: React.SFC<MobileSearchResultsProps> = ({
  data,
}) => {
  if (!data) {
    return null;
  }

  if (data.top.length <= 0) {
    return (
      <div className="isMobile">
        <Container>
          <h2>No results found!</h2>
        </Container>
      </div>
    )
  }

  const renderSearchResults = (field:any, fieldName:any) => (
    <div>
      <AreaTitle>{fieldName}</AreaTitle>
      <HLContainer>
        <HList>{data[field].map(itemRenderer.bind(null, data))}</HList>
      </HLContainer>
    </div>
  )

  return (
    <div className="isMobile">
      <Container>
          {data.top.length > 0 && renderSearchResults('top', 'Top Resullts')}
          {data.pages.length > 0 && renderSearchResults('pages', 'Pages')}
          {data.groups.length > 0 && renderSearchResults('groups', 'Student Groups')}
          {data.events.length > 0 && renderSearchResults('events', 'Events')}
          {data.news.length > 0 && renderSearchResults('news', 'News')}
      </Container>
    </div>
  );
};

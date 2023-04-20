import React from 'react';
import qs from 'qs';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import styled, { css, cx } from 'react-emotion';
import { MobileSearchResults } from './MobileSearchResults';
import { WindowSize } from 'react-fns';
import { Loader } from './Loader';
import {COLORS, SIZES} from '../constants';
import {Filtering} from "./Filtering";
import {FilterMap, SearchResultForm} from "../types";

const SearchAppContainer = styled('div')`
  text-align: center;
  max-width: 1280px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 16px 32px;
`;

const loadingDimStyles = css`
  opacity: 0.7;
`;

const welcomeTextStyles = css`
  color: ${COLORS.PURPLE};
  margin-top: 8vh;
  margin-bottom: 8vh;
  font-size: 32px;
  opacity: 1;
  transition: margin-top ease 300ms, font-size ease 800ms, opacity ease 300ms;

  .SearchApp--search & {
    margin-top: 0;
    font-size: ${SIZES.E1};
    opacity: 0;
  }
  
  @media (min-width: 768px) {
    font-size: 8vmin;
  }
`;

interface SearchAppProps {}

interface SearchQueryPayload {
  top: string[];
  news: string[];
  pages: string[];
  groups: string[];
}

interface SearchAppState {
  query: string;
  queryId: number;
  isLoading: boolean;
  initialView: boolean;
  latestData: null | SearchQueryPayload; // fix
  queryCache: {
    [query: string]: SearchQueryPayload; // fix
  };
  filterMap: FilterMap;
}

export class SearchApp extends React.Component<SearchAppProps, SearchAppState> {
  timer: ReturnType<typeof setTimeout> | null;
  constructor(props: SearchAppProps) {
    super(props);

    const query = qs.parse(window.location.search.slice(1)).q || '';

    this.timer = null;

    this.state = {
      query,
      queryCache: {},
      queryId: 0,
      latestData: null,
      isLoading: false,
      initialView: query === '',
      filterMap: {
        [SearchResultForm.Event]: true,
        [SearchResultForm.StudentGroup]: true,
        [SearchResultForm.News]: true,
        [SearchResultForm.Page]: true,
      }
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilterToggle = this.handleFilterToggle.bind(this);
  }

  handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const nextQuery = e.target.value;
    this.setState(
      (state) => ({ query: nextQuery, queryId: state.queryId + 1 }),
      () => {
        window.history.replaceState(
          {},
          '',
          `${window.location.pathname}?${qs.stringify({ q: nextQuery })}`,
        );

        this.handleSearch(nextQuery);
      },
    );
  }

  handleSearch(query: string) {
    if (!this.state.queryCache.hasOwnProperty(query)) {
      this.setState(() => ({
        isLoading: true,
        initialView: false,
      }));

      // clear out old timer
      if (this.timer) clearTimeout(this.timer);
      // Check if search string is less than 3 characters
      if(query.length < 2) return;
      // perform request
      this.timer = setTimeout(() =>{
        fetch(
          `${process.env.REACT_APP_BACKEND_SERVICE}/?q=${query}`,
        )
          .then((res) => res.json())
          .then((data) => {
            this.setState((state) => {
  
              const latestQuery = state.query === query;
  
              if (latestQuery) {
                return {
                  ...state,
                  isLoading: false,
                  latestData: data,
                  queryCache: {
                    ...state.queryCache,
                    [query]: data,
                  },
                };
              }
  
              return {
                ...state,
                queryCache: {
                  ...state.queryCache,
                  [query]: data,
                },
              };
            });
          });
      }, 1000)

    } else {
      // Use existing cache
      this.setState((state) => ({
        latestData: state.queryCache[query],
        isLoading: false,
      }));
    }
  }

  handleFilterToggle(filterKey: string) {
    this.setState(state => ({
      ...state,
      filterMap: {
        ...state.filterMap,
        [filterKey]: !state.filterMap[filterKey]
      }
    }))
  }

  componentDidMount() {
    const { query } = this.state;
    if (query !== '') {
      this.handleSearch(query);
    }
  }

  renderContent({ width }: { width: number }) {
    const { latestData, isLoading } = this.state;

    return (
      <div>
        <Loader isLoading={isLoading} />

        <div className={cx({ [loadingDimStyles]: isLoading })}>
          {!!latestData &&
            (width > 768 ? (
              <SearchResults data={latestData} filterMap={this.state.filterMap} />
            ) : (
              <MobileSearchResults data={latestData} />
            ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <SearchAppContainer
        className={cx({ 'SearchApp--search': !this.state.initialView })}
      >
        <h1 className={welcomeTextStyles}>Looking for something?</h1>
        <SearchInput
          onChange={this.handleInput}
          value={this.state.query}
          autoFocus
        />

        <Filtering filters={{
          [SearchResultForm.Event]: 'Events',
          [SearchResultForm.StudentGroup]: 'Student Groups',
          [SearchResultForm.News]: 'News',
          [SearchResultForm.Page]: 'Pages',
        }} filterMap={this.state.filterMap}
        toggle={this.handleFilterToggle}
        />

        <WindowSize render={this.renderContent.bind(this)} />
      </SearchAppContainer>
    );
  }
}

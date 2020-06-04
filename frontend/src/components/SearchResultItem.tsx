import React from 'react';
import styled from 'react-emotion';
import { SearchResultForm } from '../types';
import { formLangs } from '../utils';
import {COLORS, SIZES} from '../constants';

export const Container = styled('li')`
  width: 220px;
  min-width: 160px;
  height: 145px;
  padding: 5px;
  background: #fff;
  position: relative;
  -webkit-box-shadow: 0.5px 3px 5px 0px rgba(0,0,0,0.15);
  -moz-box-shadow: .5px 3px 5px 0px rgba(0,0,0,0.15);
  box-shadow: 0.5px 3px 5px 0px rgba(0,0,0,0.15);
  border: 1px solid #eaeaea;
  transition: box-shadow 0.5s;
  margin-top: 10px; 

  &::before {
    content: "";
    background: #5EBDB0;
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
  }
  
`;

export const ContainerLink = styled('a')`
  display: flex;
  text-decoration: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 4px;
  flex-direction: column;
  box-sizing: border-box;
`;

export const InfoBox = styled('div')`
  background-color: #ffffff;
  padding: ${SIZES.E1};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-width: 130px;
`;

export const Title = styled('h3')`
  color: ${COLORS.PURPLE};
  text-align: center;
  box-sizing: border-box;
  font-size: ${SIZES.E3};
  margin: 0;
  line-height: normal;
  word-wrap: break-word;
`;

export const Description = styled('div')`
  font-size: ${SIZES.E2};
  color: #000000;
  box-sizing: border-box;
  margin: 0;
  overflow: hidden;
  position: relative;
  flex-grow: 1;
  line-height: normal;
  height: 100px;
  transition: box-shadow 0.5s ease-in;

  &:hover {
    box-shadow: 6px 5px 5px 0px rgba(0,0,0,0.15);
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 75%;
    background: linear-gradient(
      to bottom,
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

export const Form = styled('div')`
  color: ${COLORS.DARK};
  font-weight:bold;
  text-align: center;
  box-sizing: border-box;
  padding: ${SIZES.E1};
  text-transform: capitalize;;
  font-size: 14px;

  .isMobile & {
    display: none;
  }
`;

interface SearchResultItemProps {
  form: SearchResultForm;
  title: string;
  link: string;
  description?: string;
}

export const SearchResultItem: React.SFC<SearchResultItemProps> = ({
  title,
  form,
  // description,
  link,
}) => (
  <Container>
    <ContainerLink href={link}>
      <InfoBox>
        <Title>{title}</Title>
        {/* {description && <Description>{description}</Description>} */}
      </InfoBox>
      <Form>{formLangs(form)}</Form>
    </ContainerLink>
  </Container>
);

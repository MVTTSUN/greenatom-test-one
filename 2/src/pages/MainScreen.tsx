import { styled } from 'styled-components';
import { searchStore } from '../stores/search-store';
import { SyntheticEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';

export const MainScreen = observer(() => {
  const [searchValue, setSearchValue] = useState('');
  const { getResults, results } = searchStore;

  const onChangeSearch = (evt: SyntheticEvent<HTMLInputElement>) => {
    setSearchValue(evt.currentTarget.value);
  };

  const clickSearch = (evt: SyntheticEvent) => {
    evt.preventDefault();
    getResults(searchValue, 10);
  };

  return (
    <CenterContainer>
      <MainContainer>
        <Title>Поисковик по википедии</Title>
        <FormSearch onSubmit={clickSearch}>
          <InputSearch
            value={searchValue}
            onChange={onChangeSearch}
            placeholder="Напишите что-нибудь"
          />
          <ButtonSearch>Поиск</ButtonSearch>
        </FormSearch>
        {results[1].map((result, id) => (
          <LinkResult key={result} href={results[3][id]} target="blank">
            <TextResult>{result}</TextResult>
          </LinkResult>
        ))}
      </MainContainer>
    </CenterContainer>
  );
});

const CenterContainer = styled.div`
  box-sizing: border-box;
  padding: 25px;
  display: flex;
  justify-content: center;
  background-color: #1481cc;
  color: white;
  min-height: 100vh;
`;

const MainContainer = styled.main`
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 36px;
  font-weight: 700;
  line-height: 100%;
`;

const FormSearch = styled.form`
  display: flex;
  gap: 10px;
`;

const InputSearch = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 400;
  line-height: 100%;

  &:focus {
    outline: 4px dashed #14cc9b;
    outline-offset: -4px;
  }
`;

const ButtonSearch = styled.button`
  cursor: pointer;
  padding: 10px 25px;
  background-color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 400;
  line-height: 100%;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

const LinkResult = styled.a`
  text-decoration: none;
  padding: 10px;
  background-color: white;
  opacity: 0.8;
  border-radius: 5px;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.5;
  }
`;

const TextResult = styled.p`
  margin: 0;
  color: black;
  font-size: 20px;
  font-weight: 400;
  line-height: 100%;
`;

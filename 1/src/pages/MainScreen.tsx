import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import fetchJsonp from 'fetch-jsonp';
import { COLORS } from '../const';
import { Quote } from '../types';

export function MainScreen() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [randomColor, setRandomColor] = useState(COLORS[0]);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * COLORS.length);

    setRandomColor(COLORS[randomIndex]);
  };

  const getRandomQuote = async () => {
    try {
      const response = await fetchJsonp(
        'https://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru&jsonp=?',
        {
          jsonpCallback: 'jsonp',
        }
      );
      const data = (await response.json()) as Quote;

      setQuote(data.quoteText);
      setAuthor(data.quoteAuthor);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handleClick = () => {
    getRandomColor();
    getRandomQuote();
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <CenterContainer $randomColor={randomColor}>
      <MainContainer>
        <Title>Случайные цитаты!</Title>
        <QuoteText>{quote}</QuoteText>
        {author && <QuoteAuthor>{author}</QuoteAuthor>}
        <Button onClick={handleClick}>Клик</Button>
      </MainContainer>
    </CenterContainer>
  );
}

const CenterContainer = styled.div<{ $randomColor: string }>`
  box-sizing: border-box;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $randomColor }) => $randomColor};
  color: white;
  min-height: 100vh;
  transition: background-color 1s ease-in-out;
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

const QuoteText = styled.blockquote`
  margin: 0;
  font-size: 24px;
  font-weight: 400;
  line-height: 100%;
`;

const QuoteAuthor = styled.cite`
  margin: 0;
  font-size: 24px;
  font-weight: 400;
  line-height: 100%;
`;

const Button = styled.button`
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

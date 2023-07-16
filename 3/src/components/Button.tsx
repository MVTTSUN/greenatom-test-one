import { MouseEventHandler, PropsWithChildren } from 'react';
import { css, styled } from 'styled-components';

type ButtonProps = PropsWithChildren<{
  isGreen?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}>;

export function Button({ children, isGreen, onClick, type }: ButtonProps) {
  return (
    <ButtonStyled type={type} onClick={onClick} $isGreen={isGreen}>
      {children}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button<{ $isGreen?: boolean }>`
  cursor: pointer;
  padding: 10px 25px;
  background-color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 400;
  line-height: 100%;
  transition: opacity 0.2s ease-in-out;

  ${({ $isGreen }) =>
    $isGreen &&
    css`
      background-color: #92cc14;
      color: white;
    `};

  &:hover {
    opacity: 0.7;
  }
`;

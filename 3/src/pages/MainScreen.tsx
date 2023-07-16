import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import { itemsStore } from '../stores/items-store';
import { SyntheticEvent, useState } from 'react';
import { Button } from '../components/Button';

export const MainScreen = observer(() => {
  const [value, setValue] = useState('');
  const {
    items,
    addTodoItem,
    removeTodoItem,
    completeTodoItem,
    removeFirstTodoItem,
    removeLastTodoItem,
    updateActiveItemEven,
    updateActiveItemOdd,
  } = itemsStore;

  const inputChange = (evt: SyntheticEvent<HTMLInputElement>) =>
    setValue(evt.currentTarget.value);

  const addItemClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    addTodoItem(value);
    setValue('');
  };

  return (
    <CenterContainer>
      <MainContainer>
        <Title>Список дел</Title>
        <Form onSubmit={addItemClick}>
          <Input
            onChange={inputChange}
            value={value}
            placeholder="Добавьте дело"
          />
          <Button>Добавить</Button>
        </Form>
        {items.map((item) => (
          <ItemContainer key={item.id} $isActive={item.isActive}>
            <TextItem $isDone={item.isDone}>{item.text}</TextItem>
            <ButtonItemContainer>
              {!item.isDone && (
                <Button
                  onClick={() => completeTodoItem(item.id)}
                  isGreen
                  type="button"
                >
                  Завершить
                </Button>
              )}
              <Button
                onClick={() => removeTodoItem(item.id)}
                isGreen
                type="button"
              >
                Удалить
              </Button>
            </ButtonItemContainer>
          </ItemContainer>
        ))}
      </MainContainer>
      <AsideContainer>
        <Button onClick={updateActiveItemOdd} type="button">
          Выделить нечетные дела
        </Button>
        <Button onClick={updateActiveItemEven} type="button">
          Выделить четные дела
        </Button>
        <Button onClick={removeFirstTodoItem} type="button">
          Удалить первое дело
        </Button>
        <Button onClick={removeLastTodoItem} type="button">
          Удалить последнее дело
        </Button>
      </AsideContainer>
    </CenterContainer>
  );
});

const CenterContainer = styled.div`
  box-sizing: border-box;
  padding: 25px;
  display: flex;
  justify-content: center;
  gap: 10px;
  background-color: #cc8d14;
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
  max-width: 700px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 36px;
  font-weight: 700;
  line-height: 100%;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 400;
  line-height: 100%;

  &:focus {
    outline: 4px dashed #92cc14;
    outline-offset: -4px;
  }
`;

const ItemContainer = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  padding: 10px;
  background-color: ${({ $isActive }) => ($isActive ? '#f4f3a7' : 'white')};
  border-radius: 5px;
  opacity: 0.8;
`;

const TextItem = styled.p<{ $isDone: boolean }>`
  text-decoration: ${({ $isDone }) => $isDone && 'line-through'};
  margin: 0;
  color: black;
  font-size: 20px;
  font-weight: 400;
  line-height: 100%;
`;

const ButtonItemContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const AsideContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

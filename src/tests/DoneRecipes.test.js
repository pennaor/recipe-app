import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import customRender from './helpers/customRender';
import userEvent from '@testing-library/user-event';
import mockFetch from './helpers/mockFetch';
import LocalStorageMock from './helpers/mockLocalStorage';

const doneRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot:  'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

global.localStorage = LocalStorageMock;
localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

global.window.alert = jest.fn();

describe('Done recipes screen', () => {
  
    afterEach(() => jest.clearAllMocks());
  
    describe('44 - Implemente os elementos da tela de receitas feitas respeitando os atributos descritos no protótipo', () => {
      it('Todos os data-testids estão disponíveis', () => {
        const { history } = customRender(<App />, '/done-recipes');
        expect(history.location.pathname).toBe('/done-recipes');
      });
      it('Verifica se os nomes das receitas são renderizados', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
          json: () => Promise.resolve(doneRecipes),
        }));
        customRender(<App />, '/done-recipes');
        const firstNameCard = await screen.findByTestId('0-horizontal-name');
        expect(firstNameCard).toHaveTextContent('Spicy Arrabiata Penne');
        const secoundNameCard = await screen.findByTestId('1-horizontal-name');
        expect(secoundNameCard).toHaveTextContent('Aquamarine');
      });
      it('Verifica se ao clicando nos botões, é realizado filtro', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
        customRender(<App />, '/done-recipes');
        const btnFood = screen.getByRole('button', {name: /food/i});
        const btnDrink = screen.getByRole('button', {name: /drink/i});
        const btnAll = screen.getByRole('button', {name: /all/i});
        expect(btnFood).toBeInTheDocument();
        expect(btnDrink).toBeInTheDocument();
        expect(btnAll).toBeInTheDocument();
        const firstImageCard = await screen.findByTestId('0-horizontal-image');
        const secoundImageCard = await screen.findByTestId('1-horizontal-image');
        userEvent.click(btnFood);
        expect(firstImageCard).toBeInTheDocument();
        expect(firstImageCard.src).toBe(doneRecipes[0].image);
        expect(secoundImageCard).not.toBeInTheDocument();
        userEvent.click(btnDrink);
        expect(firstImageCard).not.toBeInTheDocument();
        expect(secoundImageCard.src).toBe(doneRecipes[1].image);
        expect(secoundImageCard).not.toBeInTheDocument();
        userEvent.click(btnAll);
        expect(await screen.findByTestId('0-horizontal-image')).toBeInTheDocument();
        expect(await screen.findByTestId('1-horizontal-image')).toBeInTheDocument();      
      });
      it('Todos os data-testids estão disponíveis', async () => {
       jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
        const { history } = customRender(<App />, '/done-recipes');
        expect(history.location.pathname).toBe('/done-recipes');
        const title = await screen.findByRole('heading', { name: 'Done Recipes' });
        expect(title).toBeInTheDocument();
        await screen.findAllByTestId(/horizontal-image/i);
        doneRecipes.forEach(({id, name, image, type}, index) => {
          const elementImage = screen.getByTestId(`${index}-horizontal-image`);
          expect(elementImage.src).toBe(image);
          userEvent.click(elementImage);
          expect(history.location.pathname).toBe(`/${type}s/${id}`);
          history.push('/done-recipes');
          expect(history.location.pathname).toBe(`/done-recipes`);
          const elementName = screen.getByTestId(`${index}-horizontal-name`);
          expect(elementName).toHaveTextContent(name);
          userEvent.click(elementName);
          // console.log(history.location.pathname);
          expect(history.location.pathname).toBe(`/${type}s/${id}`);
        })
      });
    });
  });
  
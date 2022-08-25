import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import customRender from './helpers/customRender';
import {categoriesMeals, categoriesDrink} from './helpers/mockData/categoryName';
import { cardsMeals, cardsDrinks } from './helpers/mockData/cardInformation';

describe('Verifica funcionalidades do componente Recipes', () => {
    afterEach(() => jest.clearAllMocks());
    describe('testes da composição dos elementos renderizados em Recipes', () => {
      it('deve renderizar os botões das categorias na página "/foods"',
      async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(categoriesMeals),
          }));
        const { history } = customRender(<App />, '/foods');
        expect(history.location.pathname).toBe('/foods');
        expect(await screen.findByRole('button', { name: /beef/i })).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: /breakfast/i })).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: /chicken/i })).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: /dessert/i })).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: /goat/i })).toBeInTheDocument();
      });
      it('deve renderizar os botões das categorias na página "/drinks"',
      async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(categoriesDrink),
          }));
        const { history } = customRender(<App />, '/drinks');
        expect(history.location.pathname).toBe('/drinks');
        expect(await screen.findByRole('button', { name: /Ordinary Drink/i })).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: /Cocktail/i })).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: /Shake/i })).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: /Other.Unknown/i })).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: /Cocoa/i })).toBeInTheDocument();
      });
    });
    describe('testes da composição dos elementos renderizados em Recipes', () => {
      it('testando se o clique dos botões de categorias "foods" funcionam',
      async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(categoriesMeals),
          }));
        // try {
          const { history } = customRender(<App />, '/foods');
        expect(history.location.pathname).toBe('/foods')
        const beefButton = await screen.findByRole('button', { name: /beef/i });
        const breakfastButton = await screen.findByRole('button', { name: /breakfast/i });
        const chickenButton = await screen.findByRole('button', { name: /chicken/i });
        const dessertButton = await screen.findByRole('button', { name: /dessert/i });
        const goatButton = await screen.findByRole('button', { name: /goat/i });
        const allButton = await screen.findByRole('button', { name: /all/i });
        userEvent.click(beefButton);
        userEvent.click(breakfastButton);
        userEvent.click(chickenButton);
        userEvent.click(dessertButton);
        userEvent.click(goatButton);
        userEvent.click(allButton);
        // userEvent.click(firstCardDiv);
      });
      
      it('testando se o clique dos botões de categorias "drinks" funcionam',
      async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(categoriesDrink),
          }));
          const { history } = customRender(<App />, '/drinks');
          expect(history.location.pathname).toBe('/drinks')
          const ordinaryButton = await screen.findByRole('button', {name: /ordinary drink/i});
          const cocktailButton = await screen.findByRole('button', {name: /cocktail/i});
          const shakeButton = await screen.findByRole('button', {name: /shake/i});
          const otherButton = await screen.findByRole('button', {name: /other/i});
          const cocoaButton = await screen.findByRole('button', {name: /cocoa/i});
          const allButton = await screen.findByRole('button', {name: /all/i});
          const firstCard = await screen.findByTestId('0-card-img');
        expect(firstCard).toBeInTheDocument();
        const secoundCard = await screen.findByTestId('1-card-img');
        expect(secoundCard).toBeInTheDocument();
        const nameFirstCard = await screen.findByTestId('0-card-name');
        expect(nameFirstCard).toBeInTheDocument();
        const nameSecoundCard = await screen.findByTestId('1-card-name');
        expect(nameSecoundCard).toBeInTheDocument();
          expect(nameFirstCard).toBeInTheDocument();
          expect(ordinaryButton).toBeInTheDocument();
          expect(cocktailButton).toBeInTheDocument();
          expect(shakeButton).toBeInTheDocument();
          expect(otherButton).toBeInTheDocument();
          expect(cocoaButton).toBeInTheDocument();
          expect(allButton).toBeInTheDocument();
          userEvent.click(ordinaryButton);
          userEvent.click(cocktailButton);
          userEvent.click(shakeButton);
          userEvent.click(otherButton);
          userEvent.click(cocoaButton);
          userEvent.click(allButton);
      });

      it('Verifica se ao clicar no card foods redireciona para a página de detalhes', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
          json: () => Promise.resolve(cardsMeals),
        }));
        const { history } = customRender(<App />, '/foods');
        expect(history.location.pathname).toBe('/foods');
        const firstCard = await screen.findByTestId('0-recipe-card');
        expect(firstCard).toBeInTheDocument();
          const nameFirstCard = await screen.findByTestId('0-card-name');
          expect(nameFirstCard.innerHTML).toContain('Corba');
          const imgFirstCard = await screen.findByTestId('0-card-img');
          expect(imgFirstCard.src).toContain('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
          userEvent.click(firstCard);
          expect(history.location.pathname).toBe('/foods/52977');
          history.push('/foods');
          const secoundCard = await screen.findByTestId('1-recipe-card');
          expect(secoundCard).toBeInTheDocument();
          userEvent.click(secoundCard);
          expect(history.location.pathname).toBe('/foods/53060');
          history.push('/foods');
          const lastCard = await screen.findByTestId('11-recipe-card');
          expect(lastCard).toBeInTheDocument();
          const searchBtn = screen.getByTestId('search-top-btn');
          expect(searchBtn).toBeInTheDocument();
          userEvent.click(searchBtn);
          const nameSearchRadio = screen.getByTestId('name-search-radio');
          userEvent.click(nameSearchRadio);
          const searchInput = screen.getByTestId('search-input');
          userEvent.click(searchInput);
          userEvent.type(searchInput, 'soup');
          const searchBtnHeader = screen.getByTestId('exec-search-btn');
          expect(searchBtnHeader).toBeInTheDocument();
          userEvent.click(searchBtnHeader);
          // const nameFirstCardSoup = await screen.findByTestId('0-card-name');
          // expect(nameFirstCardSoup.innerHTML).toContain('Leblebi Soup');

      });

      it('Verifica se ao clicar no card drinks redireciona para a página de detalhes', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
          json: () => Promise.resolve(cardsDrinks),
        }));
          const { history } = customRender(<App />, '/drinks');
          expect(history.location.pathname).toBe('/drinks');
          const firstCard = await screen.findByTestId('0-recipe-card');
          expect(firstCard).toBeInTheDocument();
          const nameFirstCard = await screen.findByTestId('0-card-name');
          expect(nameFirstCard.innerHTML).toContain('GG');
          const imgFirstCard = await screen.findByTestId('0-card-img');
          expect(imgFirstCard.src).toContain('https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
          userEvent.click(firstCard);
          expect(history.location.pathname).toBe('/drinks/15997');
          history.push('/drinks');
          const secoundCard = await screen.findByTestId('1-recipe-card');
          expect(secoundCard).toBeInTheDocument();
          userEvent.click(secoundCard);
          expect(history.location.pathname).toBe('/drinks/17222');
          history.push('/drinks');
          const lastCard = await screen.findByTestId('11-recipe-card');
          expect(lastCard).toBeInTheDocument();
          const searchBtn = screen.getByTestId('search-top-btn');
          expect(searchBtn).toBeInTheDocument();
          userEvent.click(searchBtn);
          const nameSearchRadio = screen.getByTestId('name-search-radio');
          userEvent.click(nameSearchRadio);
          const searchInput = screen.getByTestId('search-input');
          userEvent.click(searchInput);
          userEvent.type(searchInput, 'gin');
          const searchBtnHeader = screen.getByTestId('exec-search-btn');
          expect(searchBtnHeader).toBeInTheDocument();
          userEvent.click(searchBtnHeader);
          // const nameFirstCardSoup = await screen.findByTestId('0-card-name');
          // expect(nameFirstCardSoup.innerHTML).toContain('Gin Fizz');
      });
    })
});
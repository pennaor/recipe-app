import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import customRender from './helpers/customRender';
import mockFetch from './helpers/mockFetch';
import {categoriesMeals, categoriesDrink} from './helpers/mockData/categoryName';

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
});
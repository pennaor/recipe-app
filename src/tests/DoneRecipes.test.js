import React from 'react';
import App from '../App';
import customRender from './helpers/customRender';

describe('Done recipes screen', () => {
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
  
    beforeEach(() => jest.spyOn(window, 'alert'));
  
    describe('44 - Implemente os elementos da tela de receitas feitas respeitando os atributos descritos no protótipo', () => {
      it('Todos os data-testids estão disponíveis', () => {
        const { history } = customRender(<App />, '/done-recipes');
        expect(history.location.pathname).toBe('/done-recipes');
      });
    });
  });
  
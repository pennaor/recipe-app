import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import customRender from './helpers/customRender';
import mockLocalStorage from './helpers/mockLocalStorage';

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

  global.localStorage = mockLocalStorage;
  global.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  global.document.execCommand = () => Promise.resolve({})

  beforeEach(() => jest.spyOn(window, 'alert'));


  it('Todos os elementos da tela de receitas devem estar disponíveis', () => {
    const { history } = customRender(<App />, '/done-recipes');
    expect(history.location.pathname).toBe('/done-recipes');
    [/all/i, /food/i, /drink/i].forEach((button) => {
      expect(screen.getByRole('button', { name: button })).toBeInTheDocument();
    });

    const recipesImages = screen.getAllByAltText(/recipe of/i);
    expect(recipesImages).toHaveLength(2);
    expect(recipesImages[0]).toHaveAttribute('src', doneRecipes[0].image);
    expect(recipesImages[1]).toHaveAttribute('src', doneRecipes[1].image);

    const recipesCategorys = screen.getAllByTestId(/-horizontal-top-text/);
    expect(recipesCategorys).toHaveLength(2);
    expect(recipesCategorys[0]).toHaveTextContent('Italian - Vegetarian');
    expect(recipesCategorys[1]).toHaveTextContent('Alcoholic');

    const recipesNames = screen.getAllByTestId(/-horizontal-name/);
    expect(recipesNames).toHaveLength(2);
    expect(recipesNames[0]).toHaveTextContent('Spicy Arrabiata Penne');
    expect(recipesNames[1]).toHaveTextContent('Aquamarine');

    const shareButton = screen.getAllByAltText(/share button/i);
    expect(shareButton).toHaveLength(2);
    expect(shareButton[0]).toHaveAttribute('src', 'shareIcon.svg');
    expect(shareButton[1]).toHaveAttribute('src', 'shareIcon.svg');
  });

  it('ao clicar no botão de compartilhar deve aparecer a mensagem "Link copied!',
  async () => {
    customRender(<App />, '/done-recipes');
    const shareButton = screen.getAllByAltText(/share button/i);
    expect(shareButton).toHaveLength(2);
    userEvent.click(shareButton[0]);
    await screen.findByText('Link copied!');
  });

});
  
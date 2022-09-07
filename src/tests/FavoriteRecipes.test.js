import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import customRender from './helpers/customRender';
import mockLocalStorage from './helpers/mockLocalStorage';

const favoriteRecipes = [
  {
    id: '53013',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Big Mac',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
  {
    id: '53026',
    type: 'food',
    nationality: 'Egyptian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Tamiya',
    image: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg'
  }
];

const doneRecipes = [
  {
    id: '53013',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Big Mac',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '24/04/2020',
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
global.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
global.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
global.document.execCommand = () => Promise.resolve({})

describe('Verifica funcionalidades da página de Favorite Recipes', () => {
  it('testa a presença e composição dos elementos associados a receita',
  () => {
    customRender(<App />, '/favorite-recipes');

    [/all/i, /food/i, /drink/i].forEach((button) => {
      expect(screen.getByRole('button', { name: button })).toBeInTheDocument();
    });

    const recipesImages = screen.getAllByAltText(/recipe of/i);
    expect(recipesImages).toHaveLength(3);
    expect(recipesImages[0]).toHaveAttribute('src', favoriteRecipes[0].image);
    expect(recipesImages[1]).toHaveAttribute('src', favoriteRecipes[1].image);

    const recipesCategorys = screen.getAllByTestId(/-horizontal-top-text/);
    expect(recipesCategorys).toHaveLength(3);
    expect(recipesCategorys[0]).toHaveTextContent('Italian - Vegetarian');
    expect(recipesCategorys[1]).toHaveTextContent('Alcoholic');

    const recipesNames = screen.getAllByTestId(/-horizontal-name/);
    expect(recipesNames).toHaveLength(3);
    expect(recipesNames[0]).toHaveTextContent('Big Mac');
    expect(recipesNames[1]).toHaveTextContent('Aquamarine');

    const unFavoriteButton = screen.getAllByAltText(/favorite button/i);
    expect(unFavoriteButton).toHaveLength(3);
    expect(unFavoriteButton[0]).toHaveAttribute('src', 'blackHeartIcon.svg');
    expect(unFavoriteButton[1]).toHaveAttribute('src', 'blackHeartIcon.svg');

    const shareButton = screen.getAllByAltText(/share button/i);
    expect(shareButton).toHaveLength(3);
    expect(shareButton[0]).toHaveAttribute('src', 'shareIcon.svg');
    expect(shareButton[1]).toHaveAttribute('src', 'shareIcon.svg');

  });

  it('ao clicar no botão de compartilhar deve aparecer a mensagem "Link copied!',
  async () => {
    customRender(<App />, '/favorite-recipes');
    const shareButton = screen.getAllByAltText(/share button/i);
    expect(shareButton).toHaveLength(3);
    userEvent.click(shareButton[0]);
    await screen.findByText('Link copied!');
  });
  it('ao desfavoritar a receita, esta deve ser removida da tela e localStorage',
  async () => {
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(favoriteRecipes);
    customRender(<App />, '/favorite-recipes');

    const recipesImages = screen.getAllByAltText(/recipe of/i);
    expect(recipesImages).toHaveLength(3);
    expect(recipesImages[0]).toHaveAttribute('src', favoriteRecipes[0].image);
    expect(recipesImages[1]).toHaveAttribute('src', favoriteRecipes[1].image);
  
    const unFavoriteButton = screen.getAllByAltText(/favorite button/i);
    expect(unFavoriteButton).toHaveLength(3);

    userEvent.click(unFavoriteButton[0]);
    await waitFor(() => {
      expect(recipesImages[0]).not.toBeInTheDocument();
      expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([favoriteRecipes[1], favoriteRecipes[2]])
    });
    userEvent.click(unFavoriteButton[1]);
    await waitFor(() => {
      expect(recipesImages[1]).not.toBeInTheDocument();
      expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([favoriteRecipes[2]]);
    });
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });
  it('ao filtrar receita por tipo, verifica se apenas as respectivas são renderizadas',
  async () => {
    customRender(<App />, '/favorite-recipes');
    const filters = screen.getAllByRole('button', { name: /all|food|drink/i });
    expect(filters).toHaveLength(3);

    const recipesImages = screen.getAllByAltText(/recipe of/i);
    expect(recipesImages).toHaveLength(3);
    expect(recipesImages[0]).toHaveAttribute('src', favoriteRecipes[0].image);
    expect(recipesImages[1]).toHaveAttribute('src', favoriteRecipes[1].image);

    const [all_btn, food_btn, drink_btn] = filters;
    userEvent.click(food_btn);
    const food = await screen.findAllByAltText(/recipe of/i);
    expect(food).toHaveLength(2);
    expect(food[0]).toHaveAttribute('src', favoriteRecipes[0].image);
    expect(food[1]).toHaveAttribute('src', favoriteRecipes[2].image);

    userEvent.click(drink_btn);
    const drink = await screen.findByAltText(/recipe of/i);
    expect(drink).toHaveAttribute('src', favoriteRecipes[1].image);

    userEvent.click(all_btn);
    const allRecipes = await screen.findAllByAltText(/recipe of/i);
    expect(allRecipes).toHaveLength(3);
    expect(allRecipes[0]).toHaveAttribute('src', favoriteRecipes[0].image);
    expect(allRecipes[1]).toHaveAttribute('src', favoriteRecipes[1].image);
  });

  it('verifica se a data da receita favorita que foi finalizada e as tags são visíveis',
  () => {
    customRender(<App />, '/favorite-recipes');
    screen.getByText(doneRecipes[0].doneDate);
    screen.getByText(doneRecipes[1].doneDate);
    screen.getByText(doneRecipes[0].tags[0]);
  })

});
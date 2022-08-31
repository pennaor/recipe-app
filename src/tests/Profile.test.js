import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockLocalStorage from './helpers/mockLocalStorage';
import customRender from './helpers/customRender';
import App from '../App';

global.localStorage = mockLocalStorage;

describe('', () => {
  it('Verifica se existe os botões de [Done Recipes, Favorite Recipes, Logout]', () => {
    customRender(<App />, '/profile');
    const btns = screen.getAllByRole('button');

    expect(btns).toHaveLength(3);
  } )

  it('Verifica se ao clicar no botão Done Recipes é redirecionada para páginas de Receitas prontas.', () => {
    const { history } = customRender(<App />, '/profile');
    const doneRecipes = screen.getByRole('button', { name: /Done Recipes/i });

    userEvent.click(doneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');
  } )

  it('Verifica se ao clicar no botão Favorite Recipes é redirecionada para páginas de Receitas Favoritas.', () => {
    const { history } = customRender(<App />, '/profile');
    const favoriteRecipes = screen.getByRole('button', { name: /Favorite Recipes/i });

    userEvent.click(favoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');
  } )

  it('Verifica se ao clicar no botão Logout é redirecionada para páginas Login e limpa todas as chaves do localStorage.', () => {
    global.localStorage.setItem('mealsToken', 1);
    global.localStorage.setItem('cocktailsToken', 1);
    global.localStorage.setItem('user', JSON.stringify({ email: 'email@email.com'}));
    global.localStorage.setItem('doneRecipes', JSON.stringify([{ id: 'id-da-receita' }]));
    global.localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: 'id-da-receita' }]));
    global.localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: { idDaBebida: ['lista-de-ingredientes-utilizados' ] }}));
    const { history } = customRender(<App />, '/profile');
    const logout = screen.getByRole('button', { name: /Logout/i });

    userEvent.click(logout);
    expect(history.location.pathname).toBe('/');
    expect(localStorage).toHaveLength(0);
  } )
})

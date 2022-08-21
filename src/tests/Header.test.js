import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import customRender from './helpers/customRender';

describe('Verifica funcionalidades do componente Header', () => {
  describe('testes da composição dos elementos renderizados em Header', () => {
    it('a página Foods deve renderizar o header com icones de perfil e pesquisa assim como com título "Foods"',
    () => {
      const { history } = customRender(<App />, '/foods');
      expect(history.location.pathname).toBe('/foods');
      expect(screen.getByRole('heading', { name: 'Foods' }));
      expect(screen.queryByAltText('icone de perfil')).toBeInTheDocument();
      expect(screen.queryByAltText('icone de pesquisa')).toBeInTheDocument();
    });
    it('a página Drinks deve renderizar o header com icones de perfil e pesquisa assim como o título "Drinks"', 
    () => {
      const { history } = customRender(<App />, '/drinks');
      expect(history.location.pathname).toBe('/drinks');
      expect(screen.getByRole('heading', { name: 'Drinks' }));
      expect(screen.queryByAltText('icone de perfil')).toBeInTheDocument();
      expect(screen.queryByAltText('icone de pesquisa')).toBeInTheDocument();
    });
  
    it('a página Profile deve renderizar o header com apenas o icone de perfil e pesquisa assim como o título "Profile"',
    () => {
      const { history } = customRender(<App />, '/profile');
      expect(history.location.pathname).toBe('/profile');
      expect(screen.getByRole('heading', { name: 'Profile' }));
      expect(screen.queryByAltText('icone de perfil')).toBeInTheDocument();
      expect(screen.queryByAltText('icone de pesquisa')).not.toBeInTheDocument();
    });
    it('a página Done Recipes deve renderizar o header com apenas o icone de perfil e pesquisa assim como o título "Done Recipes"',
    () => {
      const { history } = customRender(<App />, '/done-recipes');
      expect(history.location.pathname).toBe('/done-recipes');
      expect(screen.getByRole('heading', { name: 'Done Recipes' }));
      expect(screen.queryByAltText('icone de perfil')).toBeInTheDocument();
      expect(screen.queryByAltText('icone de pesquisa')).not.toBeInTheDocument();
    });
    it('a página Favorite Recipes deve renderizar o header com apenas o icone de perfil e pesquisa assim como o título "Favorite Recipes"',
    () => {
      const { history } = customRender(<App />, '/favorite-recipes');
      expect(history.location.pathname).toBe('/favorite-recipes');
      expect(screen.getByRole('heading', { name: 'Favorite Recipes' }));
      expect(screen.queryByAltText('icone de perfil')).toBeInTheDocument();
      expect(screen.queryByAltText('icone de pesquisa')).not.toBeInTheDocument();
    });
  
    it('a página de Login não deve possuir o header',
    () => {
      const { history } = customRender(<App />);
      expect(history.location.pathname).toBe('/');
      expect(screen.queryByAltText('icone de perfil')).not.toBeInTheDocument();
      expect(screen.queryByAltText('icone de pesquisa')).not.toBeInTheDocument();
    });
    it('a página de receita de comidas não deve possuir header',
    () => {
      const { history } = customRender(<App />, '/foods/333');
      expect(history.location.pathname).toBe('/foods/333');
      expect(screen.queryByAltText('icone de perfil')).not.toBeInTheDocument();
      expect(screen.queryByAltText('icone de pesquisa')).not.toBeInTheDocument();
    });
    it('a página de progresso da receita de comida não deve possuir header',
    () => {
      const { history } = customRender(<App />, '/foods/333/in-progress');
      expect(history.location.pathname).toBe('/foods/333/in-progress');
      expect(screen.queryByAltText('icone de perfil')).not.toBeInTheDocument();
      expect(screen.queryByAltText('icone de pesquisa')).not.toBeInTheDocument();
    });
    it('a página de receita de bebidas não deve possuir header',
    () => {
      const { history } = customRender(<App />, '/drinks/333');
      expect(history.location.pathname).toBe('/drinks/333');
      expect(screen.queryByAltText('icone de perfil')).not.toBeInTheDocument();
      expect(screen.queryByAltText('icone de pesquisa')).not.toBeInTheDocument();
    });
    it('a página de progresso da receita de bebida não deve possuir header',
    () => {
      const { history } = customRender(<App />, '/drinks/333/in-progress');
      expect(history.location.pathname).toBe('/drinks/333/in-progress');
      expect(screen.queryByAltText('icone de perfil')).not.toBeInTheDocument();
      expect(screen.queryByAltText('icone de pesquisa')).not.toBeInTheDocument();
    });
  });

  it('ao clicar no botão de perfil, o usuário deve ser redirecionado para tela de perfil',
  () => {
    const { history } = customRender(<App />, '/foods');
    userEvent.click(screen.getByAltText('icone de perfil'));
    expect(history.location.pathname).toBe('/profile');
    expect(screen.getByRole('heading', { name: 'Profile' }));
  });
  it('com cliques no icone de pesquisa, a barra de busca deve aparecer e desaparecer',
  () => {
    customRender(<App />, '/foods');
    const searchIcon = screen.getByAltText('icone de pesquisa');
    expect(searchIcon).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Buscar receitas')).not.toBeInTheDocument();
    userEvent.click(searchIcon);
    expect(screen.queryByPlaceholderText('Buscar receitas')).toBeInTheDocument();
    userEvent.click(searchIcon);
    expect(screen.queryByPlaceholderText('Buscar receitas')).not.toBeInTheDocument();
  });
});

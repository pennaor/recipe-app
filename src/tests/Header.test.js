import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import customRender from './helpers/customRender';
import mockFetch from './helpers/mockFetch';

global.window.alert = jest.fn(() => null);

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
      const { history } = customRender(<App />, '/foods/53013');
      expect(history.location.pathname).toBe('/foods/53013');
      expect(screen.queryByAltText('icone de perfil')).not.toBeInTheDocument();
      expect(screen.queryByAltText('icone de pesquisa')).not.toBeInTheDocument();
    });
    it('a página de progresso da receita de comida não deve possuir header',
    () => {
      const { history } = customRender(<App />, '/foods/53013/in-progress');
      expect(history.location.pathname).toBe('/foods/53013/in-progress');
      expect(screen.queryByAltText('icone de perfil')).not.toBeInTheDocument();
      expect(screen.queryByAltText('icone de pesquisa')).not.toBeInTheDocument();
    });
    it('a página de receita de bebidas não deve possuir header',
    () => {
      const { history } = customRender(<App />, '/drinks/178319');
      expect(history.location.pathname).toBe('/drinks/178319');
      expect(screen.queryByAltText('icone de perfil')).not.toBeInTheDocument();
      expect(screen.queryByAltText('icone de pesquisa')).not.toBeInTheDocument();
    });
    it('a página de progresso da receita de bebida não deve possuir header',
    () => {
      const { history } = customRender(<App />, '/drinks/178319/in-progress');
      expect(history.location.pathname).toBe('/drinks/178319/in-progress');
      expect(screen.queryByAltText('icone de perfil')).not.toBeInTheDocument();
      expect(screen.queryByAltText('icone de pesquisa')).not.toBeInTheDocument();
    });
  });

  describe('testes do componente SearchBar', () => {
    it('ao clicar no botão de perfil, o usuário deve ser redirecionado para tela de perfil',
    () => {
      const { history } = customRender(<App />, '/foods');
      userEvent.click(screen.getByAltText('icone de perfil'));
      expect(history.location.pathname).toBe('/profile');
      expect(screen.getByRole('heading', { name: 'Profile' }));
    });

    it('com cliques no icone de pesquisa, a barra de busca deve aparecer e desaparecer em Foods',
    () => {
      customRender(<App />, '/foods');
      const searchIcon = screen.getByAltText('icone de pesquisa');
      expect(searchIcon).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Buscar receitas')).not.toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /ingredient/i, checked: true })).not.toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /name/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /first letter/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /search/i })).not.toBeInTheDocument();
      userEvent.click(searchIcon);
      expect(screen.queryByPlaceholderText('Buscar receitas')).toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /ingredient/i, checked: true })).toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /name/i })).toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /first letter/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /search/i })).toBeInTheDocument();
      userEvent.click(searchIcon);
      expect(screen.queryByPlaceholderText('Buscar receitas')).not.toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /ingredient/i, checked: true })).not.toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /name/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /first letter/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /search/i })).not.toBeInTheDocument();
    });
    it('com cliques no icone de pesquisa, a barra de busca deve aparecer e desaparecer em Drinks',
    () => {
      customRender(<App />, '/drinks');
      const searchIcon = screen.getByAltText('icone de pesquisa');
      expect(searchIcon).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Buscar receitas')).not.toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /ingredient/i, checked: true })).not.toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /name/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /first letter/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /search/i })).not.toBeInTheDocument();
      userEvent.click(searchIcon);
      expect(screen.queryByPlaceholderText('Buscar receitas')).toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /ingredient/i, checked: true })).toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /name/i })).toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /first letter/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /search/i })).toBeInTheDocument();
      userEvent.click(searchIcon);
      expect(screen.queryByPlaceholderText('Buscar receitas')).not.toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /ingredient/i, checked: true })).not.toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /name/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('radio', { name: /first letter/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /search/i })).not.toBeInTheDocument();
    });

    it('verifica requisição para API de comidas filtrada por ingrediente',
    async () => {
      const mockSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/foods');
      userEvent.click(screen.getByAltText('icone de pesquisa'));
      const searchInput = screen.getByPlaceholderText('Buscar receitas');
      userEvent.type(searchInput, 'Cheese');
      screen.getByRole('radio', { name: /ingredient/i, checked: true });
      userEvent.click(screen.getByRole('button', { name: /search/i }));
      await waitFor(() => expect(mockSpy).toBeCalled());
    });
    it('verifica requisição para API de comidas filtrada por nome',
    async () => {
      const mockSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/foods');
      userEvent.click(screen.getByAltText('icone de pesquisa'));
      const searchInput = screen.getByPlaceholderText('Buscar receitas');
      userEvent.type(searchInput, 'Arrabiata');
      userEvent.click(screen.getByRole('radio', { name: /name/i }));
      userEvent.click(screen.getByRole('button', { name: /search/i }));
      await waitFor(() => expect(mockSpy).toBeCalled());
    });
    it('verifica se a requisição para API de comidas filtrada pela letra A',
    async () => {
      const mockSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/foods');
      userEvent.click(screen.getByAltText('icone de pesquisa'));
      const searchInput = screen.getByPlaceholderText('Buscar receitas');
      userEvent.type(searchInput, 'A');
      userEvent.click(screen.getByRole('radio', { name: /first letter/i }));
      userEvent.click(screen.getByRole('button', { name: /search/i }));
      await waitFor(() => expect(mockSpy).toBeCalled());
    });
    it('verifica se é emitido um alerta caso a requisição comidas filtrada por letra houver mais de um caractere',
    async () => {
      const mockSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/foods');
      await waitFor(() => expect(mockSpy).toBeCalled());
      userEvent.click(screen.getByAltText('icone de pesquisa'));
      const searchInput = screen.getByPlaceholderText('Buscar receitas');
      userEvent.type(searchInput, 'Arra');
      userEvent.click(screen.getByRole('radio', { name: /first letter/i }));
      userEvent.click(screen.getByRole('button', { name: /search/i }));
      await waitFor(() => expect(window.alert).toBeCalled());
    });
    it('verifica se ao receber uma receita de comida ocorre redirecionamento para a página de detalhes',
    async () => {
      const mockSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      const { history } = customRender(<App />, '/foods');
      userEvent.click(screen.getByAltText('icone de pesquisa'));
      const searchInput = screen.getByPlaceholderText('Buscar receitas');
      userEvent.type(searchInput, 'Big Mac');
      userEvent.click(screen.getByRole('radio', { name: /name/i }));
      userEvent.click(screen.getByRole('button', { name: /search/i }));
      await waitFor(() => {
        expect(mockSpy).toBeCalled();
        expect(history.location.pathname).toBe('/foods/53013');
      });   
    });
    it('verifica se ao encontrar nenhuma receita de comida, um alerta é emitido',
    async () => {
      const mockSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/foods');
      userEvent.click(screen.getByAltText('icone de pesquisa'));
      const searchInput = screen.getByPlaceholderText('Buscar receitas');
      userEvent.type(searchInput, 'Big');
      userEvent.click(screen.getByRole('radio', { name: /name/i }));
      userEvent.click(screen.getByRole('button', { name: /search/i }));
      await waitFor(() => {
        expect(mockSpy).toBeCalled();
        expect(window.alert).toBeCalled();
      });
    });

    it('verifica requisição para API de bebidas filtrada por ingrediente',
    async () => {
      const mockSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/drinks');
      userEvent.click(screen.getByAltText('icone de pesquisa'));
      const searchInput = screen.getByPlaceholderText('Buscar receitas');
      userEvent.type(searchInput, 'Vodka');
      screen.getByRole('radio', { name: /ingredient/i, checked: true });
      userEvent.click(screen.getByRole('button', { name: /search/i }));
      await waitFor(() => expect(mockSpy).toBeCalled());
    });
    it('verifica requisição para API de bebidas filtrada por nome',
    async () => {
      const mockSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/drinks');
      userEvent.click(screen.getByAltText('icone de pesquisa'));
      const searchInput = screen.getByPlaceholderText('Buscar receitas');
      userEvent.type(searchInput, 'Aquamarine');
      userEvent.click(screen.getByRole('radio', { name: /name/i }));
      userEvent.click(screen.getByRole('button', { name: /search/i }));
      await waitFor(() => expect(mockSpy).toBeCalled());
    });
    it('verifica se a requisição para API de bebidas filtrada pela letra A',
    async () => {
      const mockSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/drinks');
      userEvent.click(screen.getByAltText('icone de pesquisa'));
      const searchInput = screen.getByPlaceholderText('Buscar receitas');
      userEvent.type(searchInput, 'A');
      userEvent.click(screen.getByRole('radio', { name: /first letter/i }));
      userEvent.click(screen.getByRole('button', { name: /search/i }));
      await waitFor(() => expect(mockSpy).toBeCalled());
    });
    it('verifica se a requisição para API de bebidas filtrada por letra não é feita se houver mais de um caractere',
    async () => {
      const mockSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/drinks');
      await waitFor(() => expect(mockSpy).toBeCalled());
      userEvent.click(screen.getByAltText('icone de pesquisa'));
      const searchInput = screen.getByPlaceholderText('Buscar receitas');
      userEvent.type(searchInput, 'Arra');
      userEvent.click(screen.getByRole('radio', { name: /first letter/i }));
      userEvent.click(screen.getByRole('button', { name: /search/i }));
      await waitFor(() => expect(window.alert).toBeCalled());
    });
    it('verifica se ao receber uma receita de bebida ocorre redirecionamento para a página de detalhes',
    async () => {
      const mockSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      const { history } = customRender(<App />, '/drinks');
      userEvent.click(screen.getByAltText('icone de pesquisa'));
      const searchInput = screen.getByPlaceholderText('Buscar receitas');
      userEvent.type(searchInput, 'Aquamarine');
      userEvent.click(screen.getByRole('radio', { name: /name/i }));
      userEvent.click(screen.getByRole('button', { name: /search/i }));
      await waitFor(() => {
        expect(mockSpy).toBeCalled()
        expect(history.location.pathname).toBe('/drinks/178319');
      });
    });
    it('verifica se ao encontrar nenhuma receita de bebida, um alerta é emitido',
    async () => {
      const mockSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/drinks');
      userEvent.click(screen.getByAltText('icone de pesquisa'));
      const searchInput = screen.getByPlaceholderText('Buscar receitas');
      userEvent.type(searchInput, 'falhabebida');
      userEvent.click(screen.getByRole('radio', { name: /name/i }));
      userEvent.click(screen.getByRole('button', { name: /search/i }));
      await waitFor(() => { 
        expect(window.alert).toBeCalled();
      });
    });
  });

});

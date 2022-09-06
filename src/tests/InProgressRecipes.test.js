import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event'; 
import customRender from './helpers/customRender';
import mockFetch from './helpers/mockFetch';
import LocalStorageMock from './helpers/mockLocalStorage';

global.localStorage = new LocalStorageMock;

describe('Verifica funcionalidades da página receitas em progresso', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  describe('Verifica casos em que o tipo da receita é food', () => {
    it('verifica chamada a API e se os elementos do protótipo estão presentes',
    async () => {
      customRender(<App />, '/foods/53013/in-progress');
      await waitFor(() => expect(global.fetch).toBeCalled());
      expect(await screen.findByAltText('Recipe')).toBeInTheDocument();
      expect(await screen.findByText('Big Mac')).toBeInTheDocument();
      expect(await screen.findByAltText('Share button')).toBeInTheDocument();
      expect(await screen.findByAltText('Favorite button')).toBeInTheDocument();
      expect(await screen.findByText('Beef')).toBeInTheDocument();
      expect(await screen.findAllByRole('checkbox')).toHaveLength(14);
      expect(await screen.findByText(/for the big mac sauce/i)).toBeInTheDocument();
      expect(await screen.findByRole('button', { name: /finish recipe/i })).toBeInTheDocument();
    });
  
    it('ao clicar em um ingrediente, este deve alternar entre checked e unchecked',
    async () => {
      customRender(<App />, '/foods/53013/in-progress');
      const ingredients = await screen.findAllByRole('checkbox');
      expect(ingredients).toHaveLength(14);
      expect(ingredients[0]).not.toHaveAttribute('checked');
      userEvent.click(ingredients[0]);
      expect(ingredients[0]).toHaveAttribute('checked');
      userEvent.click(ingredients[0]);
      expect(ingredients[0]).not.toHaveAttribute('checked');
    });
  
    it('ao clicar em todos ingredientes, verifica se eles são checked e se botão "Finish Recipe" é habilitado',
    async () => {
      customRender(<App />, '/foods/53013/in-progress');
      const finishRecipeButton = await screen.findByRole('button', { name: /finish recipe/i });
      expect(finishRecipeButton).toBeInTheDocument();
      expect(finishRecipeButton).toHaveAttribute('disabled');
      const ingredients = await screen.findAllByRole('checkbox');
      expect(ingredients).toHaveLength(14);
      ingredients.forEach((ingrendient) => {
        userEvent.click(ingrendient);
        expect(ingrendient).toHaveAttribute('checked');
      });
      expect(finishRecipeButton).not.toHaveAttribute('disabled');
    });
  
    it('verifica se os ingredientes anteriormente checked são renderizados como checked',
    async () => {
      customRender(<App />, '/foods/53013/in-progress');
      const ingredients = await screen.findAllByRole('checkbox');
      expect(ingredients).toHaveLength(14);
      ingredients.forEach((ingrendient) => {
        expect(ingrendient).toHaveAttribute('checked');
      });
    });
  
    it('verifica se ao clicar no botão "Finish Recipe" o usuário é redirecionado para página de receitas feitas',
    async () => {
      const { history } = customRender(<App />, '/foods/53013/in-progress');
      const finishRecipeButton = await screen.findByRole('button', { name: /finish recipe/i });
      expect(finishRecipeButton).not.toHaveAttribute('disabled');
      userEvent.click(finishRecipeButton);
      await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));
      await screen.findByTestId(/horizontal-done-date/i);
      localStorage.clear();
    });
  });

  describe('Verifica casos em que o tipo da receita é drinks', () => {
    it('verifica chamada a API e se os elementos do protótipo estão presentes',
    async () => {
      customRender(<App />, '/drinks/178319/in-progress');
      await waitFor(() => expect(global.fetch).toBeCalled());
      expect(await screen.findByAltText('Recipe')).toBeInTheDocument();
      expect(await screen.findByText('Aquamarine')).toBeInTheDocument();
      expect(await screen.findByAltText('Share button')).toBeInTheDocument();
      expect(await screen.findByAltText('Favorite button')).toBeInTheDocument();
      expect(await screen.findByText('Alcoholic')).toBeInTheDocument();
      expect(await screen.findAllByRole('checkbox')).toHaveLength(3);
      expect(await screen.findByText(/shake well in a shaker with ice/i)).toBeInTheDocument();
      expect(await screen.findByRole('button', { name: /finish recipe/i })).toBeInTheDocument();
    });

    it('ao clicar em um ingrediente, este deve alternar entre checked e unchecked',
    async () => {
      customRender(<App />, '/drinks/178319/in-progress');
      const ingredients = await screen.findAllByRole('checkbox');
      expect(ingredients).toHaveLength(3);
      expect(ingredients[0]).not.toHaveAttribute('checked');
      userEvent.click(ingredients[0]);
      expect(ingredients[0]).toHaveAttribute('checked');
      userEvent.click(ingredients[0]);
      expect(ingredients[0]).not.toHaveAttribute('checked');
    });

    it('ao clicar em todos ingredientes, verifica se eles são checked e se botão "Finish Recipe" é habilitado',
    async () => {
      customRender(<App />, '/drinks/178319/in-progress');
      const finishRecipeButton = await screen.findByRole('button', { name: /finish recipe/i });
      expect(finishRecipeButton).toBeInTheDocument();
      expect(finishRecipeButton).toHaveAttribute('disabled');
      const ingredients = await screen.findAllByRole('checkbox');
      expect(ingredients).toHaveLength(3);
      ingredients.forEach((ingrendient) => {
        userEvent.click(ingrendient);
        expect(ingrendient).toHaveAttribute('checked');
      });
      expect(finishRecipeButton).not.toHaveAttribute('disabled');
    });

    it('verifica se os ingredientes anteriormente checked são renderizados como checked',
    async () => {
      customRender(<App />, '/drinks/178319/in-progress');
      const ingredients = await screen.findAllByRole('checkbox');
      expect(ingredients).toHaveLength(3);
      ingredients.forEach((ingrendient) => {
        expect(ingrendient).toHaveAttribute('checked');
      });
    });

    it('verifica se ao clicar no botão "Finish Recipe" o usuário é redirecionado para página de receitas feitas',
    async () => {
      const { history } = customRender(<App />, '/drinks/178319/in-progress');
      const finishRecipeButton = await screen.findByRole('button', { name: /finish recipe/i });
      expect(finishRecipeButton).not.toHaveAttribute('disabled');
      userEvent.click(finishRecipeButton);
      await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));
      await screen.findByTestId(/horizontal-done-date/i)
      localStorage.clear();
    });

  });
});
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event'; 
import customRender from './helpers/customRender';
import mockFetch from './helpers/mockFetch';

global.document.execCommand = () => Promise.resolve();

describe('Verifica funcionalidades do componente CardRecipe', () => {
  describe('Deve ser feita uma requisição para a API passando o `id` da receita', () => {
    it('na página de comida',
    async () => {
      const mockSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/foods/52771');
      await waitFor(() => expect(mockSpy).toBeCalled());
      const title = await screen.findByTestId('recipe-title');
      expect(title).toHaveTextContent('Big Mac');
    });
  
    it('na página de bebida',
    async () => {
      const mockSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/drinks/178319');
      await waitFor(() => expect(mockSpy).toBeCalled());
      const title = await screen.findByTestId('recipe-title');
      expect(title).toHaveTextContent('Aquamarine');
    });
  });

  describe('A tela deve possuir imagem, título, lista de ingredientes e quantidades, instruções, vídeo e recomendações', () => {
    it('a tela de comida deve possuir tais elementos assim como categoria da comida',
    async () => {
      const strIngredients = [
        ['Minced Beef', '400g'],
        ['Olive Oil', '2 tbs'],
        ['Sesame Seed Burger Buns', '2'],
        ['Onion', 'Chopped'],
        ['Iceberg Lettuce', '1/4'],
        ['Cheese', '2 sliced'],
        ['Dill Pickles', '2 large'],
        ['Mayonnaise', '1 cup'],
        ['White Wine Vinegar', '2 tsp'],
        ['Pepper', 'Pinch'],
        ['Mustard', '2 tsp'],
        ['Onion Salt', '1 1/2 tsp'],
        ['Garlic Powder', '1 1/2 tsp'],
        ['Paprika', '1/2 tsp'],
      ];
      const strMealThumb = 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg';
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/foods/52771');
      await screen.findByRole('heading', { name: 'Big Mac' });
      expect(screen.getByTestId('recipe-category')).toHaveTextContent('Beef');
      strIngredients.forEach(([ingredient, measure], i) => {
        const element = screen.getByTestId(`${i}-ingredient-name-and-measure`);
        expect(element).toHaveTextContent(`${ingredient} - ${measure}`);
      });
      screen.getByText(/For the Big Mac sauce, combine all the ingredients/);
      expect(screen.getByTestId('recipe-photo')).toHaveAttribute('src', strMealThumb);
    });
    it('a tela de bebidas deve possuir tais elementos assim como se é alcoólica ou não',
    async () => {
      const strIngredients = [
        ['Hpnotiq', '2 oz'],
        ['Pineapple Juice', '1 oz'],
        ['Banana Liqueur', '1 oz'],
      ];
      const strDrinkThumb = 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg';
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/drinks/178319');
      await screen.findByRole('heading', { name: 'Aquamarine' });
      expect(screen.getByTestId('recipe-category')).toHaveTextContent('Alcoholic');
      screen.getByText(/Shake well in a shaker with ice/);
      strIngredients.forEach(([ingredient, measure], i) => {
        const element = screen.getByTestId(`${i}-ingredient-name-and-measure`);
        expect(element).toHaveTextContent(`${ingredient} - ${measure}`);
      });
      expect(screen.getByTestId('recipe-photo')).toHaveAttribute('src', strDrinkThumb);
    });
  });

  describe('Os botões de compartilhamento e de favoritar receita devem fazer suas respectivas responsabilidades', () => {
    it('Ao clicar no botão compartilar, é renderizado a mensagem "Link Copied"', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/foods/52771');
      const shareBtn = await screen.findByTestId('share-btn');
      
      userEvent.click(shareBtn);

      const messageCopied = await screen.findByText(/Link copied!/i)
      expect(messageCopied).toBeInTheDocument();
      await waitFor(() => {
        expect(messageCopied).not.toBeInTheDocument();
      })

    })

    it('Ao clicar no botão favoritar, na receita pela primeira vez, a imagem no botão é substituída pela imagem do blackHeartIcon', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/foods/52771');
      const favoriteBtn = await screen.findByTestId('favorite-btn');
      
      userEvent.click(favoriteBtn);
      expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    })

    it('Ao clicar no botão favoritar, na receita pela primeira vez, a imagem no botão é substituída pela imagem do whiteHeartIcon', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      customRender(<App />, '/foods/52771');
      const favoriteBtn = await screen.findByTestId('favorite-btn');
      
      userEvent.click(favoriteBtn);
      expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    })
  })
});

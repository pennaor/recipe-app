import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithProvider from './helpers/renderWithProvider';
import userEvent from '@testing-library/user-event';
import LocalStorageMock from './helpers/mockLocalStorage';

global.localStorage = LocalStorageMock;

describe('Verifica funcionalidades da página de Login', () => {
  it('verifica os inputs e botão de entrar na aplicação', () => {
    renderWithProvider(<App />);
    const email = screen.getByLabelText(/e-mail/i);
    expect(email).toBeInTheDocument();
    const password = screen.getByLabelText(/senha/i);
    expect(password).toBeInTheDocument();
    const enterButton = screen.getByRole('button', { name: /enter/i });
    expect(enterButton).toBeInTheDocument();
  });
  it('o botão de entrar é desabilitado com entradas inválidas', 
  () => {
    renderWithProvider(<App />);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /enter/i });
    expect(enterButton).toBeDisabled();
    userEvent.type(emailInput, 'email@invalido');
    userEvent.type(passwordInput, '123456');
    expect(enterButton).toBeDisabled();
  });
  it('o botão de entrar é habilitado com entradas válidas', 
  () => {
    renderWithProvider(<App />);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /enter/i });
    expect(enterButton).toBeDisabled();
    userEvent.type(emailInput, 'alda@gmail.com');
    userEvent.type(passwordInput, '1234567');
    expect(enterButton).not.toBeDisabled();
  });
  it('ao entrar, verifica se o usuário é redirecionado para /foods', 
  () => {
    const { history } = renderWithProvider(<App />);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /enter/i });
    userEvent.type(emailInput, 'alda@gmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(enterButton);
    expect(history.location.pathname).toBe('/foods');
  });
  it('ao entrar, verifica se o localStorage possui e-mail e tokens válidos', 
  () => {
    const { history } = renderWithProvider(<App />);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /enter/i });
    userEvent.type(emailInput, 'alda@gmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(enterButton);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({
        email: 'alda@gmail.com'
      },
    );
    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
  });
});

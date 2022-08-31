import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import customRender from './helpers/customRender';
import LocalStorageMock from './helpers/mockLocalStorage';

global.localStorage = LocalStorageMock;

describe('Verifica funcionalidades da página de Login', () => {
  it('verifica os inputs e botão de entrar na aplicação',
  () => {
    customRender(<App />);
    const email = screen.getByPlaceholderText(/e-mail/i);
    expect(email).toBeInTheDocument();
    const password = screen.getByPlaceholderText(/senha/i);
    expect(password).toBeInTheDocument();
    const enterButton = screen.getByRole('button', { name: /entrar/i });
    expect(enterButton).toBeInTheDocument();
  });
  it('o botão de entrar é desabilitado com entradas inválidas', 
  () => {
    customRender(<App />);
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });
    expect(enterButton).toBeDisabled();
    userEvent.type(emailInput, 'email@invalido');
    userEvent.type(passwordInput, '123456');
    expect(enterButton).toBeDisabled();
  });
  it('o botão de entrar é habilitado com entradas válidas', 
  () => {
    customRender(<App />);
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });
    expect(enterButton).toBeDisabled();
    userEvent.type(emailInput, 'alda@gmail.com');
    userEvent.type(passwordInput, '1234567');
    expect(enterButton).not.toBeDisabled();
  });
  it('ao entrar, verifica se o usuário é redirecionado para /foods', 
  () => {
    const { history } = customRender(<App />);
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, 'alda@gmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(enterButton);
    expect(history.location.pathname).toBe('/foods');
    expect(screen.getByRole('heading', { name: 'Foods' }));
  });
  it('ao entrar, verifica se o localStorage possui e-mail e tokens válidos', 
  () => {
    customRender(<App />);
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, 'alda@gmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(enterButton);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({ email: 'alda@gmail.com' });
    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
  });
});

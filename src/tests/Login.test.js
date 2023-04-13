import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

const emailType = 'user@email.com';
const passwordType = '123456';

describe('Renderiza a página de Login e...', () => {
  it('Veja se tem 2 inputs e 1 botão, e o botão só está ativado após email e senha válidos.', () => {
    renderWithRouterAndRedux(<Login />);
    const allInputField = screen.getAllByRole('textbox');
    expect(allInputField).toHaveLength(2);
    const btnEl = screen.getByRole('button', { name: /entrar/i });
    expect(btnEl).toBeDefined();
    expect(btnEl).toBeDisabled();

    userEvent.type(allInputField[0], emailType);
    userEvent.type(allInputField[1], passwordType);

    expect(btnEl).not.toBeDisabled();
  });
  it('Pressione o botão de entrar e vá para rota "carteira"', () => {
    renderWithRouterAndRedux(<Login />);
    const allInputField = screen.getAllByRole('textbox');

    userEvent.type(allInputField[0], emailType);
    userEvent.type(allInputField[1], passwordType);

    const btnEl = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(btnEl);
  });
});

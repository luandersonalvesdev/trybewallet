import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Renderiza a página Wallet e...', () => {
  it('Veja se tem o texto "TrybeWallet", se o valor inicial é "0.00" e tem "BRL"', () => {
    renderWithRedux(<Wallet />);
    const trybeWalletEl = screen.getByText(/trybewallet/i);
    const initialValueEl = screen.getByText(/0\.00/i);
    const currencyEl = screen.getByText(/brl/i);

    expect(trybeWalletEl).toBeDefined();
    expect(initialValueEl).toBeDefined();
    expect(currencyEl).toBeDefined();
  });
  it('Se ao adicionar uma despesa ela renderiza na tabela', async () => {
    renderWithRedux(<Wallet />);
    const inputDescription = screen.getByRole('textbox', { name: /descrição da despesa/i });
    userEvent.type(inputDescription, 'Cueca');
    const btnEl = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(btnEl).toBeDefined();
    userEvent.click(btnEl);

    const getDescriptionEl = await screen.findByRole('cell', { name: /cueca/i });
    expect(getDescriptionEl).toBeDefined();
  });
  it('Se ao clicar em editar, o botão muda o texto', async () => {
    renderWithRedux(<Wallet />);
    const btnEl = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(btnEl).toBeDefined();
    userEvent.click(btnEl);

    const btnEditEl = await screen.findByRole('button', { name: /editar/i });
    userEvent.click(btnEditEl);
    expect(btnEditEl).toBeDefined();

    const btnSaveEditEl = await screen.findByRole('button', { name: /editar despesa/i });
    expect(btnSaveEditEl).toBeDefined();
  });
  it('Salvar alguma edição da despesa', async () => {
    renderWithRedux(<Wallet />);
    const btnEl = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(btnEl).toBeDefined();
    userEvent.click(btnEl);

    const btnEditEl = await screen.findByRole('button', { name: /editar/i });
    expect(btnEditEl).toBeDefined();
    userEvent.click(btnEditEl);

    const inputFieldEl = screen.getByRole('textbox', { name: /descrição da despesa/i });
    userEvent.type(inputFieldEl, 'cueca');

    const btnSaveEditEl = screen.getByRole('button', { name: /editar despesa/i });
    expect(btnSaveEditEl).toBeDefined();
    userEvent.click(btnEditEl);
  });
});

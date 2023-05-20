import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

afterEach(() => jest.clearAllMocks());

describe('Renderiza a página Wallet e...', () => {
  it('Veja se tem o texto "TrybeWallet", se o valor inicial é "0.00" e tem "BRL"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const trybeWalletEl = screen.getByText(/trybewallet/i);
    const initialValueEl = screen.getByText(/0\.00/i);
    const currencyEl = screen.getByText(/brl/i);

    expect(trybeWalletEl).toBeDefined();
    expect(initialValueEl).toBeDefined();
    expect(currencyEl).toBeDefined();
  });
  it('Se ao adicionar uma despesa ela renderiza na tabela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const inputDescription = screen.getByRole('textbox', { name: /descrição da despesa/i });
    userEvent.type(inputDescription, 'Cueca');
    const btnEl = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(btnEl).toBeDefined();
    userEvent.click(btnEl);

    const getDescriptionEl = await screen.findByRole('cell', { name: /cueca/i });
    expect(getDescriptionEl).toBeDefined();
  });
  it('Salvar alguma edição da despesa', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const inputDescriptionEl = screen.getByRole('textbox', { name: /descrição da despesa/i });
    expect(inputDescriptionEl).toBeDefined();
    userEvent.type(inputDescriptionEl, 'cueca');

    const btnAddExpenseEl = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(btnAddExpenseEl).toBeDefined();
    userEvent.click(btnAddExpenseEl);

    const getDescriptionEl = await screen.findByRole('cell', { name: /cueca/i });
    expect(getDescriptionEl).toBeDefined();

    const btnEditExpenseEl = screen.getByRole('button', { name: /editar/i });
    expect(btnEditExpenseEl).toBeDefined();
    userEvent.click(btnEditExpenseEl);

    userEvent.type(inputDescriptionEl, 'roupa');

    const btnToEditEl = screen.getByRole('button', { name: /editar despesa/i });
    expect(btnToEditEl).toBeDefined();
    userEvent.click(btnToEditEl);

    const roupaEl = screen.getByRole('cell', { name: /roupa/i });
    expect(roupaEl).toBeDefined();
    expect(screen.queryByRole('cell', { name: /cueca/i })).toBeNull();
  });
  it('Excluir alguma despesa', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const inputDescriptionEl = screen.getByRole('textbox', { name: /descrição da despesa/i });
    expect(inputDescriptionEl).toBeDefined();
    userEvent.type(inputDescriptionEl, 'cueca');

    const btnAddExpenseEl = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(btnAddExpenseEl).toBeDefined();
    userEvent.click(btnAddExpenseEl);

    const getDescriptionEl = await screen.findByRole('cell', { name: /cueca/i });
    expect(getDescriptionEl).toBeDefined();

    const btnDeleteExpenseEl = screen.getByRole('button', { name: /excluir/i });
    expect(btnDeleteExpenseEl).toBeDefined();
    userEvent.click(btnDeleteExpenseEl);

    expect(screen.queryByRole(('cell', { name: /cueca/i }))).toBeNull();
  });
  it('Se acontece o fetch 1 vez ao carregar a página trazendo as moedas para as opções do select', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const optionEl = await screen.findByRole(('option'), { name: /btc/i });
    expect(optionEl).toBeDefined();

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  it('Ao adicionar um despesa o valor total é atualizado.', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const totalFieldEl = screen.getByTestId('total-field');
    expect(totalFieldEl.innerHTML).toBe('0.00');

    const inputValueEl = screen.getByRole('spinbutton', { name: /valor da despesa/i });
    const btnAddExpenseEl = screen.getByRole('button', { name: /adicionar despesa/i });
    const descriptionEl = screen.getByRole('textbox', { name: /descrição da despesa/i });

    userEvent.type(inputValueEl, '10');
    userEvent.type(descriptionEl, 'cueca');
    userEvent.click(btnAddExpenseEl);

    const tableDescriptionEl = await screen.findByRole('cell', { name: /cueca/i });
    expect(tableDescriptionEl).toBeDefined();

    const totalFieldEl2 = await screen.findByTestId('total-field');
    expect(totalFieldEl2.innerHTML).toBe('47.53');
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

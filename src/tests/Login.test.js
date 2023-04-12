import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter, renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

describe('Renderiza a página de Login e...', () => {
  it('Veja se tem 2 inputs', () => {
    renderWithRouterAndRedux(<Login />);
    // const get = screen.getByRole('textbox', { name: /email/i });
  });
});

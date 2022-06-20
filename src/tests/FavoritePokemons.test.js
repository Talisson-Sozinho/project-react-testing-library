import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../pages';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 3: Teste do FavoritePokemons.js', () => {
  test('Verifica se é exibida a mensagem "No favorite pokemon found"', () => {
    render(<FavoritePokemons />);

    const notFoundElement = screen.getByText(/No favorite pokemon found/i);

    expect(notFoundElement).toBeInTheDocument();
  });

  test('Verifica se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetailsButton);

    const favCheckbox = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    userEvent.click(favCheckbox);

    const favoritesLinkButton = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoritesLinkButton);

    const moreDetailsButtons = screen.getAllByRole('link', { name: /More details/i });

    expect(moreDetailsButtons).toHaveLength(1);

    const homeLinkButton = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLinkButton);

    const classFireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(classFireButton);

    const secondMoreDetailsButton = screen.getByRole('link', { name: /More details/i });
    userEvent.click(secondMoreDetailsButton);
    const secondFavCheckbox = screen.getByRole('checkbox', {
      name: /Pokémon favoritado/i,
    });
    userEvent.click(secondFavCheckbox);
    userEvent.click(favoritesLinkButton);

    const withSecondMoreDetailsButtons = screen.getAllByRole('link', {
      name: /More details/i,
    });

    expect(withSecondMoreDetailsButtons).toHaveLength(2);
  });
});

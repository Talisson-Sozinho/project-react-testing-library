import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 1: Teste do App.js', () => {
  let homeLinkElement;
  let aboutLinkElement;
  let favoriteLinkElement;
  let history;

  beforeEach(() => {
    history = renderWithRouter(<App />);
    homeLinkElement = screen.getByRole('link', { name: /Home/i });
    aboutLinkElement = screen.getByRole('link', { name: /About/i });
    favoriteLinkElement = screen.getByRole('link', { name: /Favorite Pokémons/i });
  });

  test('Verifica se há 3 links de navegação na página', () => {
    const navElement = screen.getByRole('navigation');
    const numberOfLinks = 3;

    expect(navElement.children).toHaveLength(numberOfLinks);
    expect(homeLinkElement).toBeInTheDocument();
    expect(aboutLinkElement).toBeInTheDocument();
    expect(favoriteLinkElement).toBeInTheDocument();
  });

  test('Verifica se ao clicar no link "Home", é redirecionada para "/"',
    () => {
      userEvent.click(homeLinkElement);
      expect(history.location.pathname).toBe('/');
    });

  test('Verifica se ao clicar no link "About", é redirecionada para "/about"',
    () => {
      userEvent.click(aboutLinkElement);
      expect(history.location.pathname).toBe('/about');
    });

  test('Verifica se ao clicar no link "Favoritados", é redirecionada para "/favorites"',
    () => {
      userEvent.click(favoriteLinkElement);
      expect(history.location.pathname).toBe('/favorites');
    });

  test('Verifica se ao entrar em uma URL desconhecida, é redirecionada para "Not Found"',
    () => {
      history.push('/URLdesconhecida');
      const notFoundElement = screen.getByRole('heading', {
        name: /Page requested not found/i,
        level: 2,
      });
      expect(notFoundElement).toBeInTheDocument();
    });
});

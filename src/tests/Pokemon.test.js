import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

describe('Requisito 6: Teste do Pokemon.js', () => {
  const pokemonExample = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  };
  let history;

  beforeEach(() => {
    history = renderWithRouter(
      <Pokemon
        pokemon={ pokemonExample }
        isFavorite
      />,
    );
  });

  test('Verifica se é renderizado um card com as informações do pokémon', () => {
    const pokemonName = screen.getByText(/Pikachu/i);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByText(/Electric/i);
    expect(pokemonType).toBeInTheDocument();

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImage = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pokemonImage).toHaveAttribute('src', pokemonExample.image);
  });

  test('Verifica se contém um link de navegação para exibir detalhes do pokémon', () => {
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  test('Verifica o link faz o redirecionamento para a página de detalhes', () => {
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Verifica se existe um ícone de estrela nos pokémons favoritados', () => {
    const svgImageFavoriteCheck = screen.getByRole('img', {
      name: /Pikachu is marked as favorite/i,
    });

    expect(svgImageFavoriteCheck).toHaveAttribute('src', '/star-icon.svg');
  });
});

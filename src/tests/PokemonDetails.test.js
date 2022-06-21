import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokemonDetails from '../pages/PokemonDetails';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Requisito 7: Teste do PokemonDetails.js', () => {
  const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.id] = false;
    return acc;
  }, {});
  const match = {
    params: {
      id: '25',
    },
  };

  test('Verifica se as informações detalhadas do pokémon são mostradas na tela', () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
        match={ match }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const nameText = screen.getByText(/Pikachu Details/i);
    expect(nameText).toBeInTheDocument();

    const detailsLink = screen.queryByRole('link', { name: /More details/i });
    expect(detailsLink).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(summary).toBeInTheDocument();

    const detailsResumeText = screen.getByText(pokemons[0].summary);
    expect(detailsResumeText).toBeInTheDocument();
  });

  test('Verifica se existe os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
        match={ match }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const gameLocationTitle = screen.getByRole('heading', {
      name: /Game Locations of pikachu/i,
      level: 2,
    });
    expect(gameLocationTitle).toBeInTheDocument();

    const numberOfLocations = pokemons[0].foundAt.length;
    const pokemonLocations = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(pokemonLocations).toHaveLength(numberOfLocations);

    expect(pokemonLocations[0]).toHaveProperty('src', pokemons[0].foundAt[0].map);
    expect(pokemonLocations[0]).toHaveProperty('alt', 'Pikachu location');
    expect(pokemonLocations[1]).toHaveProperty('src', pokemons[0].foundAt[1].map);
    expect(pokemonLocations[1]).toHaveProperty('alt', 'Pikachu location');
  });

  test('Verifica se pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);

    expect(favoriteCheckbox).toBeChecked();

    const favoriteSvg = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoriteSvg).toBeInTheDocument();
  });
});

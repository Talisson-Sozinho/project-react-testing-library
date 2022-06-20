import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
  acc[pokemon.id] = false;
  return acc;
}, {});

describe('Requisito 5: Teste do Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
  });

  test('Verifica se a página contém um heading "Encountered pokémons"', () => {
    const headingText = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(headingText).toBeInTheDocument();
  });

  test('Verifica se o próximo pokémon é exibido quando clica no botão "Próximo"', () => {
    const namePokemon = screen.getByText(pokemons[0].name);
    expect(namePokemon).toBeInTheDocument();

    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonButton);

    const nextNamePokemon = screen.getByText(pokemons[1].name);
    expect(nextNamePokemon).toBeInTheDocument();
  });

  test('Verifica se é mostrado apenas um pokémon por vez', () => {
    const pokemonCards = screen.getAllByRole('img', { name: /sprite/i });
    expect(pokemonCards).toHaveLength(1);
  });

  test('Verifica se a Pokédex tem os botões de filtro', () => {
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const dataTestId = 'pokemon-type';
    const buttonsPokemonsType = screen.getAllByTestId('pokemon-type-button');
    const resetFilterButton = screen.getByRole('button', { name: /All/i });

    expect(buttonsPokemonsType).toHaveLength(types.length);

    const fireTypeButton = screen.getByRole('button', { name: /fire/i });

    userEvent.click(fireTypeButton);

    const typePokemon = screen.getByTestId(dataTestId);
    expect(typePokemon).toBeInTheDocument();
    expect(typePokemon).toHaveTextContent(/fire/i);

    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonButton);

    const typeAfterClickNextPokemon1 = screen.getByTestId(dataTestId);
    expect(typeAfterClickNextPokemon1).toBeInTheDocument();
    expect(typeAfterClickNextPokemon1).toHaveTextContent(/fire/i);

    userEvent.click(nextPokemonButton);

    const typeAfterClickNextPokemon2 = screen.getByTestId(dataTestId);
    expect(typeAfterClickNextPokemon2).toBeInTheDocument();
    expect(typeAfterClickNextPokemon2).toHaveTextContent(/fire/i);

    userEvent.click(nextPokemonButton);

    const typeAfterClickNextPokemon3 = screen.getByTestId(dataTestId);
    expect(typeAfterClickNextPokemon3).toBeInTheDocument();
    expect(typeAfterClickNextPokemon3).toHaveTextContent(/fire/i);

    userEvent.click(resetFilterButton);
    expect(resetFilterButton).toBeInTheDocument();
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    const dataTestId = 'pokemon-type';
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const resetFilterButton = screen.getByRole('button', { name: /All/i });

    expect(resetFilterButton).toBeInTheDocument();

    userEvent.click(nextPokemonButton);

    const typeAfterClickNextPokemon1 = screen.getByTestId(dataTestId);
    expect(typeAfterClickNextPokemon1).toBeInTheDocument();
    expect(typeAfterClickNextPokemon1).toHaveTextContent(/fire/i);

    userEvent.click(nextPokemonButton);

    const typeAfterClickNextPokemon2 = screen.getByTestId(dataTestId);
    expect(typeAfterClickNextPokemon2).toBeInTheDocument();
    expect(typeAfterClickNextPokemon2).toHaveTextContent(/bug/i);

    userEvent.click(nextPokemonButton);

    const typeAfterClickNextPokemon3 = screen.getByTestId(dataTestId);
    expect(typeAfterClickNextPokemon3).toBeInTheDocument();
    expect(typeAfterClickNextPokemon3).toHaveTextContent(/Poison/i);
  });
});

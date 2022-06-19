import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../pages';

describe('Requisito 2: Teste do About.js', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('Verifica se a página contém as informações sobre a Pokédex', () => {
    const pokedexInfo = /This application simulates a Pokédex/i;
    const pokedexInfoElement = screen.getByText(pokedexInfo);

    expect(pokedexInfoElement).toBeInTheDocument();
  });

  test('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const titleElement = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(titleElement).toBeInTheDocument();
  });

  test('Verifica se a página contém a seguinte imagem de uma Pokédex:', () => {
    const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const paragraphsElement = screen.getByRole('img', { name: 'Pokédex' });
    expect(paragraphsElement).toHaveAttribute('src', imageUrl);
  });
});

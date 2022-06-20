import React from 'react';
import NotFound from '../pages/NotFound';

const { render, screen } = require('@testing-library/react');

describe('Requisito 4: Teste do NotFound.js', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  test('Verifica se a página contém um heading "Page requested not found"', () => {
    const notFoundTextElement = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(notFoundTextElement).toBeInTheDocument();
  });

  test('Verifica se a página mostra a imagem correta', () => {
    const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgElement = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });

    expect(imgElement).toHaveAttribute('src', imageUrl);
  });
});

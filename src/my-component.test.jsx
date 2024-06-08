import { screen, render } from '@testing-library/react';
import { MyComponent, MyComponentWithApiCall } from './my-component';
import { server } from '../server-mocks/server';
import { HttpResponse, http } from 'msw';

describe('react testing', () => {
  it('renders a component', () => {
    render(<MyComponent />);
    const text = screen.getByText('Hello world');
    expect(text).toBeInTheDocument();
  });

  it('mocks an api call', async () => {
    render(<MyComponentWithApiCall apiURL="https://pokeapi.co/api/v2/pokemon" />);

    const el1 = screen.getByText(/loading/i);
    expect(el1).toBeInTheDocument();

    const el2 = await screen.findByText(/bulbasaur/i);
    expect(el2).toBeInTheDocument();
  });

  it('mocks an api call error', async () => {
    server.resetHandlers(
      http.get('https://pokeapi.co/api/v2/pokemon', () => {
        return HttpResponse('Error', { status: 500 });
      }),
    );
    render(<MyComponentWithApiCall apiURL="https://pokeapi.co/api/v2/pokemon" />);

    const el = await screen.findByText(/Error/i);
    expect(el).toBeInTheDocument();
  });
});

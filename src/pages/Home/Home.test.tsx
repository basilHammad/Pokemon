import "@testing-library/jest-dom";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { useGetAllPokemonsQuery } from "../../services/pokemon";

jest.mock("../../services/pokemon");
jest.mock("../../utils", () => ({
  extractPokemonId: jest.fn((url: string) => url.split("/").slice(-2, -1)[0]),
}));

describe("Home component", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    (useGetAllPokemonsQuery as jest.Mock).mockReturnValue({ isLoading: true });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders error state", () => {
    (useGetAllPokemonsQuery as jest.Mock).mockReturnValue({ error: true });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  test("renders list of pokemons", async () => {
    const mockPokemons = [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    ];

    (useGetAllPokemonsQuery as jest.Mock).mockReturnValue({
      data: { results: mockPokemons },
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("charmander")).toBeInTheDocument();
    });

    // Check if links are rendered correctly
    const bulbasaurLink = screen.getByRole("link", { name: /bulbasaur/i });
    const charmanderLink = screen.getByRole("link", { name: /charmander/i });

    expect(bulbasaurLink).toHaveAttribute("href", "/pokemon/1");
    expect(charmanderLink).toHaveAttribute("href", "/pokemon/4");
  });
});

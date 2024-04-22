import "@testing-library/jest-dom";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router-dom";
import Pokemon from "./Pokemon";
import { useGetPokemonByIdQuery } from "../../services/pokemon";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("../../services/pokemon");

describe("Pokemon component", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    (useParams as jest.Mock).mockReturnValue({ pokemonId: "1" });
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({ isLoading: true });

    render(
      <MemoryRouter>
        <Pokemon />
      </MemoryRouter>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders error state", () => {
    (useParams as jest.Mock).mockReturnValue({ pokemonId: "1" });
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({ error: true });

    render(
      <MemoryRouter>
        <Pokemon />
      </MemoryRouter>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  test("renders pokemon details", async () => {
    const mockPokemonData = {
      name: "bulbasaur",
      sprites: { front_default: "bulbasaur.png" },
      height: 7,
      weight: 69,
      types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    };

    (useParams as jest.Mock).mockReturnValue({ pokemonId: "1" });
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: mockPokemonData,
    });

    render(
      <MemoryRouter>
        <Pokemon />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
      expect(screen.getByAltText("bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("Height: 7")).toBeInTheDocument();
      expect(screen.getByText("Weight: 69")).toBeInTheDocument();
      expect(screen.getByText("Types:")).toBeInTheDocument();
      expect(screen.getByText("grass")).toBeInTheDocument();
      expect(screen.getByText("poison")).toBeInTheDocument();
    });
  });
});

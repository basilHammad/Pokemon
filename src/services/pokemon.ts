import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Pokemon {
  name: string;
  url: string;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface GetAllPokemonsResponse {
  results: Pokemon[];
}

interface GetPokemonByIdResponse {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
}

export const pokemonsApi = createApi({
  reducerPath: "pokemonsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API_URL }),

  endpoints: (builder) => ({
    getPokemonById: builder.query<GetPokemonByIdResponse, number>({
      query: (id) => `pokemon/${id}`,
    }),
    getAllPokemons: builder.query<GetAllPokemonsResponse, void>({
      query: () => "pokemon",
    }),
  }),
});

export const { useGetPokemonByIdQuery, useGetAllPokemonsQuery } = pokemonsApi;

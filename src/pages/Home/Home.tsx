import { Link } from "react-router-dom";
import { Pokemon, useGetAllPokemonsQuery } from "../../services/pokemon";
import { extractPokemonId } from "../../utils";

import stl from "./Home.module.css";
import Loader from "../../components/Loader";

const Home = () => {
  const { data, error, isLoading } = useGetAllPokemonsQuery();

  if (isLoading) return <Loader />;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className={`container ${stl.wrapper}`}>
      {data?.results?.map((pokemon: Pokemon) => {
        return (
          <Link
            key={pokemon.name}
            to={`/pokemon/${extractPokemonId(pokemon.url)}`}
          >
            {pokemon.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Home;

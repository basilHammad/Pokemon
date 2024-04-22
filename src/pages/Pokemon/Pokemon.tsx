import { useParams } from "react-router-dom";
import { useGetPokemonByIdQuery } from "../../services/pokemon";

import stl from "./Pokemon.module.css";
import Loader from "../../components/Loader";

const Pokemon = () => {
  const { pokemonId } = useParams<{ pokemonId: string }>();

  const { data, error, isLoading } = useGetPokemonByIdQuery(Number(pokemonId));

  if (isLoading) return <Loader />;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className={`${stl.wrapper} container`}>
      <h1>{data?.name}</h1>
      <img src={data?.sprites.front_default} alt={data?.name} />
      <h2>Height: {data?.height}</h2>
      <h2>Weight: {data?.weight}</h2>
      <ul>
        <h2>Types:</h2>
        {data?.types.map((type) => {
          return <li key={type.type.name}>{type.type.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Pokemon;

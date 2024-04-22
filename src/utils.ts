export function extractPokemonId(url: string): number | null {
  const parts = url.split("/");

  const idString = parts[parts.length - 2];

  const id = parseInt(idString, 10);

  return isNaN(id) ? null : id;
}

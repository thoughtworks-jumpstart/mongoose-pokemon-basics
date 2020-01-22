require("./utils/db");
const SimplePokemon = require("./models/simple-pokemon.model");

const createPokemonPromise = () => {
  return SimplePokemon.create([
    {
      name: "Pikachu",
      japaneseName: "ピカチュウ",
      baseHP: 35,
      category: "Mouse Pokemon",
    },
    {
      name: "Squirtle",
      japaneseName: "ゼニガメ",
      baseHP: 44,
      category: "Tiny Turtle Pokemon",
    },
    {
      name: "Wartortle",
      japaneseName: "カメール",
      baseHP: 59,
      category: "Turtle Pokémon",
    },
    {
      name: "Meowth",
      japaneseName: "ニャース",
      baseHP: 40,
      category: "Scratch Cat Pokémon",
    },
  ]);
};

const isSimplePokemonEmpty = async () => {
  const pokemons = await SimplePokemon.find();
  if (pokemons.length) {
    return false;
  }
  return true;
};

const seedData = async () => {
  try {
    if (await isSimplePokemonEmpty()) {
      await createPokemonPromise();
      console.log("Seeded pokemon data");
    } else {
      console.log("Did not seed pokemon data: pokemon already exist");
    }
  } catch (err) {
    console.log("Error in seeding data... rolling back");
    await SimplePokemon.deleteMany();
    handleError(err);
  }
};
const deleteAll = async () => {
  try {
    await SimplePokemon.deleteMany();
  } catch (err) {
    handleError(err);
  }
};

seedData();

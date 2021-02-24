require("./utils/db");

const SimplePokemon = require("./models/simple-pokemon.model");
const handleError = require("./utils/handleError");

const findAll = async () => {
  const foundPokemons = await SimplePokemon.find();
  return foundPokemons;
};

const filterByCategory = async (category) => {
  const regex = new RegExp(category, "gi");
  const filteredPokemons = await SimplePokemon.find({ category: regex });
  return filteredPokemons;
};

const findOneByName = async (name) => {
  const foundPokemon = await SimplePokemon.findOne({ name: name });
  return foundPokemon;
};

const filterHPGreaterThan = async (HP) => {
  const filteredPokemons = await SimplePokemon.find({
    baseHP: { $gt: HP },
  });
  return filteredPokemons;
};

const createOne = async (pokemon) => {
  try {
    const newPokemon = new SimplePokemon(pokemon);
    await newPokemon.save();
  } catch (err) {
    handleError(err);
    if (err.name === "ValidationError") {
      console.log("Error 400");
      //err.status = 400;
    }
  }
};

const deleteOneById = async (id) => {
  try {
    await SimplePokemon.findByIdAndDelete(id);
  } catch (err) {
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

const findOneAndReplace = async (filter, replace) => {
  try {
    const pokemon = await SimplePokemon.findOneAndReplace(filter, replace, {
      new: true,
    });
    return pokemon;
  } catch (err) {
    handleError(err);
    if (err.name === "ValidationError") {
      console.log("Error 400");
      //err.status = 400;
    }
    return null;
  }
};

const findOneAndUpdate = async (filter, update) => {
  // note that validation is false by default
  const pokemon = await SimplePokemon.findOneAndUpdate(
    filter,
    update,
    // If `new` isn't true, `findOneAndUpdate()` will return the
    // document as it was _before_ it was updated.
    { new: true }
  );
  return pokemon;
};

// findAll().then(data => {
//   console.log(`find all: ${data}`);
// });
// filterByCategory("turtle").then(data => {
//   console.log(`filterByCategory: ${data}`);
// });

// filterHPGreaterThan(40).then(data => {
//   console.log(`filterHPGreaterThan: ${data}`);
// });

// findOneAndUpdate({ name: "Squirtle" }, { baseHP: 100 }).then(data => {
//   console.log(data);
// });

// createOne({
//   name: "Pikachu",
//   japaneseName: "ピカチュウ",
//   baseHP: 35,
//   category: "Mouse Pokemon",
// });

// findOneAndReplace(
//   { name: "Squirtle" },
//   {
//     name: "Pikachu",
//     japaneseName: "ピカチュウ",
//     baseHP: 35,
//     category: "Mouse Pokemon",
//   }
// );

// findOneByName("Pikachu").then((data) => {
//   console.log(`findOneByName: ${data}`);
//   console.log(data.nameWithJapanese);
// });

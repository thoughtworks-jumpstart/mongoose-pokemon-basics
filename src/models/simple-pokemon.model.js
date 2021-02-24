const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const simplePokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  japaneseName: String,
  baseHP: Number,
  category: String,
});

simplePokemonSchema.virtual("nameWithJapanese").get(function () {
  return `${this.name} ${this.japaneseName}`;
});

const SimplePokemon = mongoose.model("SimplePokemon", simplePokemonSchema);
module.exports = SimplePokemon;

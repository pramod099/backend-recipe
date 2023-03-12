// Import mongoose
const mongoose = require("mongoose");

// Connect to database
mongoose.connect(
  "mongodb+srv://pramodsaji94:9duJbTbtvNOPbC8N@cluster0.gjkmwar.mongodb.net/?retryWrites=true&w=majority"
);

// Schema
const Schema = mongoose.Schema;

// Create Recipe Schema
var recipeSchema = new Schema({
  name: String,
  duration: Number,
  noOfServings: String,
  cuisine: Number,
  image: String,
});

var recipeInfo = mongoose.model("recipes", recipeSchema);

module.exports = recipeInfo;

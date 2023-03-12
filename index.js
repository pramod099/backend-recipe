// Import Express
const express = require("express");
const path = require("path");

// Import recipeInfo model
const RecipeInfo = require("./model/recipeDb");

// Initialize Express
const app = new express();

// Parsing Body Parameter
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ limit: "3mb", extended: true }));

// CORS Policy
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type "
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Setting PORT number
app.listen(5001, () => {
  console.log("Server is running in port 5001");
});

// Get all recipes
app.get("/api", async (req, res) => {
  try {
    let recipeDetailList = await RecipeInfo.find();
    res.json(recipeDetailList);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all recipes
app.get("/api/:id", async (req, res) => {
  try {
    let recipeDetailList = await RecipeInfo.find({ cuisine: req.params.id });
    res.json(recipeDetailList);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add a recipe
app.post("/api/add", (req, res) => {
  try {
    let recipeDetail = new RecipeInfo(req.body);
    recipeDetail.save();
    res.send("Added");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update recipe details
app.post("/api/update", async (req, res) => {
  try {
    let movieDetail = await RecipeInfo.findByIdAndUpdate(
      req.body._id,
      req.body
    );
    res.send("Updated");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete recipe details
app.post("/api/delete", async (req, res) => {
  try {
    let recipeDetail = await RecipeInfo.findByIdAndDelete(req.body._id);
    res.send("Deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Front-End buid
app.use(express.static(path.join(__dirname, "/build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

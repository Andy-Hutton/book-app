require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Book = require("./models/book");
const bp = require("body-parser");
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bp.json());

// connect to mongodb
mongoose.connect(process.env.DATABASE_URL);

app.get("/book", async (request, response) => {
  console.log("Query String: ", request.query);

  // try catch
  try {
    const books = await Books.find(request.query);
    response.status(200).json(books);
  } catch (error) {
    console.log(error);
    response.status(404).json(error);
  }
});

// create new book
app.post("/books", async (request, response) => {
  try {
    const newBook = await Book.create(request.body);
    response.status(200).json(newBook);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

// this should delet book by ID number
app.delete("/books/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const deletedBook = await Book.findByIdAndDelete(id);
    response.status(200).send(deletedBook);
  } catch (error) {
    console.log(error);
    response.json(error);
  }
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

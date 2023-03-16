const mongoose = require("mongoose");
require("dotenv").config();

const Book = require("./models/book");

mongoose.connect(process.env.DATABASE_URL);

async function seed() {
  await Book.create({
    name: "TecEd",
    author: "James Adams",
    genre: "fiction",
    isbn: "1230456789",
  });
  await Book.create({
    name: "Coding for dummies",
    author: "Tim Smith",
    genre: "fiction",
    isbn: "10123456789",
  });
  await Book.create({
    name: "Coding 101",
    author: "Chris Literal",
    genre: "fiction",
    isbn: "1203456789",
  });

  console.log("Created a new book");

  mongoose.disconnect();
}

seed();

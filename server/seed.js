const mongoose = require("mongoose");
require("dotenv").config();

const Book = require("./models/book");

mongoose.connect(process.env.DATABASE_URL);

async function seed() {
  const books = [
    {
      name: "TecEd",
      author: "James Adams",
      genre: "fiction",
      ISBN: "1230456789",
    },
    {
      name: "Coding for dummies",
      author: "Tim Smith",
      genre: "fiction",
      ISBN: "10123456789",
    },
    {
      name: "Coding 101",
      author: "Chris Literal",
      genre: "fiction",
      ISBN: "1203456789",
    },
  ];
  books.forEach(async function (book) {
    await Book.create(book);
  });

  console.log("Created a new book");

  mongoose.disconnect();
}

seed();

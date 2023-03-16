import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookDetails() {
  const [book, setBook] = useState({});
  const [form, setForm] = useState({
    name: "",
    author: "",
    genre: "",
    isbn: "",
  });

  const { id } = useParams();

  useEffect(() => {
    getBook();
  }, []);

  async function getBook() {
    const API = `http://localhost:8080/books?_id=${id}`;
    const res = await axios.get(API);
    setBook(res.data[0]);
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleUpdateBook(event) {
    event.preventDefault();
    const body = {};
    // go through property item in the object
    for (const prop in form) {
      // if the property is not empty, then add it to our body object
      if (form[prop]) {
        body[prop] = form[prop];
      }
    }
    // so we end up with a body object which is only the fields the user has type in
    const API = `http://localhost:8080/books/${id}`;
    await axios.put(API, body);

    const newBook = { ...book, ...body };
    setBook(newBook);
  }

  return (
    <div>
      <h2>{book.name}</h2>
      <p>{book.author}</p>
      <p>{book.genre}</p>
      <p>{book.isbn}</p>
      <h2>Update Book details</h2>
      <form onSubmit={handleUpdateBook}>
        <input
          name="name"
          value={form.name}
          placeholder={book.name}
          onChange={handleChange}
        />
        <input
          name="author"
          value={form.author}
          placeholder={book.author}
          onChange={handleChange}
        />
        <input
          name="genre"
          value={form.genre}
          placeholder={book.genre}
          onChange={handleChange}
        />
        <input
          name="isbn"
          value={form.isbn}
          placeholder={book.isbn}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

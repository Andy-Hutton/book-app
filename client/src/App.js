import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState("");
  const [form, setForm] = useState({
    name: "",
    author: "",
    genre: "",
    isbn: "",
  });

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    let API = "http://localhost:8080/books";

    if (author !== "") {
      API = API + "?author=" + author;
    }
    const res = await axios.get(API);
    console.log(res.data);
    setBooks(res.data);
  }

  function handleAuthor(event) {
    setAuthor(event.target.value);
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log(form);
  }

  async function handleAddBook(event) {
    event.preventDefault();
    const API = "http://localhost:8080/books";
    const res = await axios.post(API, form);

    // add new book to the page
    const newBooksList = [...books, res.data];
    setBooks(newBooksList);

    // reset the form
    setForm({
      name: "",
      author: "",
      genre: "",
      isbn: "",
    });
  }

  async function deleteBook(id, name) {
    const confirmDelete = window.confirm(`do you want to delete ${name}?`);
    if (confirmDelete) {
      const API = `http://localhost:8080/books/${id}`;
      const res = await axios.delete(API);
      console.log(res);
      getBooks();
    }
  }

  return (
    <div className="App">
      <h1>Books</h1>
      <input
        onChange={handleAuthor}
        value={author}
        placeholder="Filter by author"
      />
      {books.map((book, index) => {
        return (
          <div key={index}>
            <h3>{book.name}</h3>
            <p>{book.author}</p>
            <p>{book.genre}</p>
            <p>{book.isbn}</p>
            <span onClick={() => deleteBook(book._id, book.name)}>X</span>
          </div>
        );
      })}
      <h2>Add a new Book</h2>
      <form onSubmit={handleAddBook}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
        />
        <input
          name="genre"
          value={form.genre}
          onChange={handleChange}
          placeholder="Genre"
        />
        <input
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          placeholder="Isbn"
        />
        <button type="submit">Add new Book</button>
      </form>
    </div>
  );
}

export default App;

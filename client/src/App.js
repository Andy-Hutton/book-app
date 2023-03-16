import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import BookDetails from "./BookDetails";

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
  }, [author]);

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
    <BrowserRouter>
      <div className="App">
        <h1>The Big Book Storage Page</h1>
        <Routes>
          <Route
            path="/"
            element={
              <div class="flex-container">
                <Home
                  handleAuthor={handleAuthor}
                  author={author}
                  books={books}
                  deleteBook={deleteBook}
                  handleAddBook={handleAddBook}
                  form={form}
                  handleChange={handleChange}
                />
              </div>
            }
          />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
        <div class="footer">
          <p>© Andy Hutton 2023</p>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

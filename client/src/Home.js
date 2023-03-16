export default function Home({
  handleName,
  name,
  books,
  deleteBook,
  handleAddBook,
  form,
  handleChange,
}) {
  return (
    <div>
      <input onChange={handleName} value={name} placeholder="Filter by Name" />
      {books.map((book, index) => {
        return (
          <div class="flex-container">
            <div class="book-info">
              <div key={index}>
                <span onClick={() => deleteBook(book._id, book.name)}>
                  X-Delete Record
                </span>
                <h2>{book.name}</h2>
                <p>{book.author}</p>
                <p>{book.genre}</p>
                <p>{book.isbn}</p>
              </div>
            </div>
          </div>
        );
      })}
      <div class="add">
        <h2>Add a Book</h2>
        <p>
          Here we have a place for you to add to our database, please feel free
          to add any favorites you may have!
        </p>
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
            placeholder="ISBN Number "
          />
          <button type="submit">Add Your Book</button>
        </form>
      </div>
    </div>
  );
}

import React from "react";

const BooksGrid = (props) => {
  return (
    <ol className="books-grid">
      {props.books.map(
        (book) =>
          book.imageLinks &&
          book.imageLinks.thumbnail && (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`,
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      onChange={(e) =>
                        props.onShelfChange(book, e.target.value)
                      }
                      value={book.shelf}
                    >
                      <option value="move" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && (
                  <div className="book-authors">{book.authors.join(" | ")}</div>
                )}
              </div>
            </li>
          )
      )}
    </ol>
  );
};

export default BooksGrid;

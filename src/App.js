import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BooksGrid from "./BooksGrid";
import SearchBooks from "./SearchBooks";

class BooksApp extends React.Component {
  state = {
    allBooks: [],
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((allBooks) => {
      this.setState(() => ({
        allBooks,
      }));
    });
  };

  changeShelf = (book, value) => {
    BooksAPI.update(book, value).then(() => {
      this.getAllBooks();
    });
  };

  render() {
    const currentlyReadingBooks = this.state.allBooks.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToReadBooks = this.state.allBooks.filter(
      (book) => book.shelf === "wantToRead"
    );
    const readBooks = this.state.allBooks.filter(
      (book) => book.shelf === "read"
    );

    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              books={this.state.allBooks}
              onShelfChange={this.changeShelf}
            />
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <BooksGrid
                        books={currentlyReadingBooks}
                        onShelfChange={this.changeShelf}
                      />
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <BooksGrid
                        books={wantToReadBooks}
                        onShelfChange={this.changeShelf}
                      />
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <BooksGrid
                        books={readBooks}
                        onShelfChange={this.changeShelf}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

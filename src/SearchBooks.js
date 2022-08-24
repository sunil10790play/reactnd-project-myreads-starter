import React, { Component } from "react";
import { Link } from "react-router-dom";
import BooksGrid from "./BooksGrid";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends Component {
  state = {
    searchQuery: "",
    booksDisplayed: [],
  };

  getSearchBooks = () => {
    if (this.state.searchQuery) {
      BooksAPI.search(this.state.searchQuery).then((searchBooks) => {
        if (!searchBooks.error) {
          const updatedShelfBooks = searchBooks.map((searchBook) => {
            const matchedBook = this.props.books.find((book) => {
              return book.id === searchBook.id;
            });
            if (matchedBook) {
              return { ...searchBook, shelf: matchedBook.shelf };
            } else {
              return { ...searchBook, shelf: "none" };
            }
          });

          this.setState(() => ({
            booksDisplayed: updatedShelfBooks,
          }));
        } else {
          this.setState(() => ({
            booksDisplayed: [],
          }));
        }
      });
    } else {
      this.setState(() => ({
        booksDisplayed: [],
      }));
    }
  };

  updateSearchQuery = (value) => {
    this.setState(
      () => ({
        searchQuery: value,
      }),
      () => {
        this.getSearchBooks();
      }
    );
  };

  changeShelf = (book, value) => {
    this.setState((prevState) => ({
      booksDisplayed: prevState.booksDisplayed.map((bookDisplayed) => {
        if (bookDisplayed.id === book.id) {
          return { ...bookDisplayed, shelf: value };
        }
        return bookDisplayed;
      }),
    }));
    this.props.onShelfChange(book, value);
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchQuery}
              onChange={(e) => this.updateSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={this.state.booksDisplayed}
            onShelfChange={this.changeShelf}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;

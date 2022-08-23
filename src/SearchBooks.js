import React, { Component } from "react";
import { Link } from "react-router-dom";
import BooksGrid from "./BooksGrid";

class SearchBooks extends Component {
  state = {
    searchQuery: "",
  };

  updateSearchQuery = (value) => {
    this.setState(() => ({
      searchQuery: value,
    }));
  };

  render() {
    const booksDisplayed = this.props.books.filter(
      (book) =>
        book.title
          .toLowerCase()
          .includes(this.state.searchQuery.toLowerCase()) ||
        book.authors.find((author) =>
          author.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        )
    );

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
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
            books={booksDisplayed}
            onShelfChange={this.props.onShelfChange}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;

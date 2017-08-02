import React from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

class Search extends React.Component {
  state = {
    booksToDisplay: [],
    query: ''
  };

  static propTypes = {
    changeShelf: PropTypes.func.isRequired
  };

  updateQuery(query) {
    query = query.trim();

    this.setState({ query });

    this.search(query);
  };

  replaceBooksFromShelves(booksFromSearch) {
    return booksFromSearch.map(book => {
      const bookMatch = this.props.books.find(bookFromShelves => book.id === bookFromShelves.id);
      return bookMatch ? bookMatch : book;
    })
  };

  search(query) {
    if (query) {
      BooksAPI.search(query, 20).then(books => {
        if (books instanceof Array) {
          books = this.replaceBooksFromShelves(books);
          this.setState({ booksToDisplay: books });
        } else {
          this.setState({ booksToDisplay: [] });
        }
      });
    } else {
      this.setState({ booksToDisplay: [] });
    }
  };


  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link> 
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={event => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.booksToDisplay.map((book, index) => (
                <li key={index}>
                  <Book book={book} onChangedShelf={this.props.changeShelf}/>
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search 

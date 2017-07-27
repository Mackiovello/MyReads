import React from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class Search extends React.Component {
  state = {
    booksToDisplay: [],
    query: ""
  }

  static propTypes = {
    changeShelf: PropTypes.func.isRequired
  }

  updateQuery(newQuery) {
    this.setState({
      query: newQuery.trim()
    })

    if (this.state.query) {
      this.search(this.state.query)
    }
  }

  search(query) {
    BooksAPI.search(query, 20).then(books => {
      if (books instanceof Array) {
        this.setState({ booksToDisplay: books })
      }
    })
  }

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

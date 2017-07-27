import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  constructor() {
    super()
    this.changeShelf = this.changeShelf.bind(this)
  }

  state = {
    books: [],
    shelves: [
      "currentlyReading",
      "wantToRead",
      "read"
    ]
  }

  componentWillMount() {
    BooksAPI.getAll().then(books => {
      console.log(books)
      this.setState({ books })
    })
  }

  changeShelf(book, shelf) {
    book.shelf = shelf
    BooksAPI.update(book, shelf)
    const updatedBooks = this.state.books.map(b => b.id === book.id ? book : b)
    this.setState({ books : updatedBooks })   
  }

  createShelfTitle(shelf) {
    let shelfTitle = shelf.split(/(?=[A-Z])/).join(" ")
    shelfTitle = shelfTitle.slice(0, 1).toUpperCase() + shelfTitle.slice(1)
    return shelfTitle
  }

  render() {
    return (
        <div className="app">
      
          <Route path="/search" render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link> 
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author"/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>
          )}/> 

          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {
                  this.state.shelves.map(shelf => {
                      return (
                        <Bookshelf
                          key={shelf} 
                          books={this.state.books.filter(book => book.shelf === shelf)} 
                          changeShelf={this.changeShelf}
                          title={this.createShelfTitle(shelf)} 
                        />
                      ) 
                  })
                }
              </div>
              <div className="open-search">
                  <Link to="/search">Add a book</Link> 
              </div>
            </div>
          )}/> 

      </div>
    )
  }
}

export default BooksApp

import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import Search from './Search'
import { Route, Link } from 'react-router-dom'

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
      this.setState({ books })
    })
  }

  changeShelf(book, shelf) {
    book.shelf = shelf
    BooksAPI.update(book, shelf)

    let updatedBooks = []
    if (this.state.books.includes(book)) {
      updatedBooks = this.state.books.map(b => b.id === book.id ? book : b)
    } else {
      updatedBooks = this.state.books.concat(book)
    }

    this.setState({ books : updatedBooks })   
  }

  createShelfTitle(shelf) {
    let shelfTitle = shelf.split(/(?=[A-Z])/).join(" ")
    shelfTitle = shelfTitle.slice(0, 1).toUpperCase() + shelfTitle.slice(1)
    return shelfTitle
  }

  render() {
    const { books, shelves } = this.state

    return (
      <div className="app">
    
        <Route path="/search" render={() => (
          <Search books={books} changeShelf={this.changeShelf}/>
        )}/> 

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {
                shelves.map(shelf => {
                  return (
                    <Bookshelf
                      key={shelf} 
                      books={books.filter(book => book.shelf === shelf)} 
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

import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentWillMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
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
               <Bookshelf 
                books={this.state.books.filter(book => book.shelf === "currentlyReading")} 
                title="Currently reading"  
              />
              <Bookshelf
                books={this.state.books.filter(book => book.shelf === "wantToRead")}
                title="Want to read"
              />
              <Bookshelf
                books={this.state.books.filter(book => book.shelf === "read")}
                title="Read"
              /> 
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

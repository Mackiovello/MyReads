import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Search from './Search';
import Shelves from './Shelves';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
  constructor() {
    super();
    this.changeShelf = this.changeShelf.bind(this);
  }

  state = {
    books: []
  };

  componentWillMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  changeShelf(book, shelf) {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState(prevState => ({
          books: prevState.books.filter(b => b.id !== book.id).concat(book)
        }))
      })
    }
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
    
        <Route path="/search" render={() => (
          <Search books={books} changeShelf={this.changeShelf}/>
        )}/> 

        <Route exact path="/" render={() => (
          <Shelves books={books} changeShelf={this.changeShelf} />
        )}/> 
      </div>
    )
  }
}

export default BooksApp

import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

function Shelves(props) {

  function createShelfTitle(shelf) {
    let shelfTitle = shelf.split(/(?=[A-Z])/).join(" ");
    shelfTitle = shelfTitle.slice(0, 1).toUpperCase() + shelfTitle.slice(1);
    return shelfTitle;
  }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {["currentlyReading", "wantToRead", "read"].map(shelf => {
          return <Bookshelf key={shelf} books={props.books.filter(book => book.shelf === shelf)} changeShelf={props.changeShelf} title={createShelfTitle(shelf)} />;
        })}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

export default Shelves;
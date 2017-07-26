import React from 'react'
import Book from './Book'
import PropTypes from "prop-types";

function Bookshelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            props.books.map((book, index) => (
              <li key={index}>
                <Book 
                  title={book.title}
                  author={book.authors[0]}
                  image={book.imageLinks.smallThumbnail}
                />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
}

export default Bookshelf;
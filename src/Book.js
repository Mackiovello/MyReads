import React from 'react';
import PropTypes from 'prop-types';

function Book(props) {
  return (
    <div className="book">
      <div className="book-top">
        { props.book.imageLinks ? <div className="book-cover" style={{ backgroundImage: `url("${props.book.imageLinks.smallThumbnail}")` }}></div> :
                                  <div className="book-cover"></div>
        }
        <div className="book-shelf-changer">
          <select value={props.book.shelf} onChange={(event) => props.onChangedShelf(props.book, event.target.value)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      { props.book.authors && <div className="book-authors">{props.book.authors.join(', ')}</div>}
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangedShelf: PropTypes.func.isRequired
};

export default Book;
import React from "react";
import PropTypes from "prop-types";

function Book(props) {
    return (
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: props.image }}></div>
                <div className="book-shelf-changer">
                    <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.title}</div>
            <div className="book-authors">{props.author}</div>
        </div>
    )
}

Book.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
}
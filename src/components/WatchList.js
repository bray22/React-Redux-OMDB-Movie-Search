import React, { Component } from 'react';

import Header from './Header';
import parseJson from 'parse-json';
import { searchConstants } from '../constants/search';
import { removeWatchListItem } from '../utils/watchListUtils';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class WatchList extends Component {

  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  _deleteFromWatchList = (title) => {
    this.setState({
      data: removeWatchListItem(title)
    });
  }

  _openDetails = (imdbId) => {
    localStorage.setItem('movieImdbId', imdbId);
    this.props.history.push("/details");
  }

  render = () => {
    const watchList = parseJson(localStorage.getItem('watchList'));

    return (
      <div className="mf-template">
        <div className="header">
          <Header />
        </div>

        <div className="search-panel">
        <div className="search-results-header">
              <h3>Watch List</h3>
            </div>
          <div className="search-results">
            { watchList.map( (movie, i) => {
              return <div key={i} className="search-results-row">
                <div key={i} className="movie-title" onClick={
                  () => this._openDetails(movie.imdbID)}>{movie.Title}</div>
                <div key={i} className="movie-type" onClick={
                  () => this._openDetails(movie.imdbID)}>{movie.Type}</div>
                <div key={i} className="movie-year" onClick={
                  () => this._openDetails(movie.imdbID)}>{movie.Year}</div>
                <div key={i} className="movie-imdb">
                  <a href={`${searchConstants.IMDB_TITLE}/${movie.imdbID}`} target="_new">
                    IMDB page
                  </a>
                </div>
                <div key={i} className="add-watchlist" onClick={
                  () => this._deleteFromWatchList(movie.Title)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </div>  
              </div>
            }) }
          </div>
        </div>
      </div>
    );
  };
}

export default WatchList;

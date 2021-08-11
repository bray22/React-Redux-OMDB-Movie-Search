import { connect } from "react-redux";
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import store from '../store';
import Header from './Header';
import parseJson from "parse-json";
import omdbServices from '../services/omdb';
import WatchList from "../modules/WatchList";
import SearchResults from "../modules/SearchResults";
import { addMovieToWatchList } from "../actions/movieAction";

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      movieTitle: {},
      loading: true,
      movieWatchList: [],
      movies: [],
      movieImdbId: 0,
      watchList: []
    };
  }

  /* page load, get */
  componentDidMount = () => {
   this.setState({
    movieWatchList: store.getState().movieWatchList,
    movieTitle: localStorage.getItem('movieTitle'),
    watchList: parseJson(localStorage.getItem('watchList'))
   });
   
   this._fetchFeatureMovie(localStorage.getItem('movieTitle'));
  }

  _fetchFeatureMovie = async (title) => {
    const response = await omdbServices.fetchMoviesByTitle(title);
    const featuredMovie  = await response.json();
   
    this.setState({
      movies: featuredMovie,
      isLoading: false,
    })
  };

  openDetails = (imdbId) => {
    localStorage.setItem('movieImdbId', imdbId);
    this._reroute();
  }

  _addMovieToWatchList = (movie) => {
    const watchListArray = store.getState().movieWatchList ? store.getState().movieWatchList: [];
    watchListArray.push(movie);
    this.props.addMovieToWatchList(watchListArray);

    let watchList = [];
    if (localStorage.getItem('watchList') === null) {
      localStorage.setItem('watchList', JSON.stringify([]));
    } else {
      watchList = parseJson(localStorage.getItem('watchList'));
      watchList.push(movie);
      localStorage.setItem('watchList', JSON.stringify(watchList));
    }

    this.setState({
      watchList: parseJson(localStorage.getItem('watchList'))
    });
  }

  _reroute = () => {
    this.props.history.push("/details");
  }
  
  render = () => {
    return (
      <div className="mf-template">
        <div className="header">
          <Header />
        </div>
        <div className="search-center">
          <div className="search-left">
            <div className="search-panel">
            <div className="search-results-header">
              <h3>Search Results</h3>
            </div>
            <div className="search-results">
              {this.state.movies.Search && <SearchResults addMovieToWatchList={this._addMovieToWatchList} movies={this.state.movies.Search} />}
              {!this.state.movies.Search ? 'No matches were found.': '' }
            </div>
          </div>
          </div>
          <div className="search-right">
            <WatchList movies={this.state.watchList} />
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    movieImdbId: state.movieImdbId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMovieToWatchList: (data) => dispatch(addMovieToWatchList(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));

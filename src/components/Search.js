import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import store from '../store';
import Header from './Header';
import omdbServices from '../services/omdb';
import { addMovieToFavs } from "../actions/movieAction";
import SearchResults from "../modules/SearchResults";
import WatchList from "../modules/WatchList";

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      data: {},
      movieTitle: store.getState().movieTitle,
      loading: true,
      movieList: [],
      movieFavorites: [],
      movies: [],
      movieImdbId: 0,
      watchList: JSON.parse(localStorage.getItem('watchList'))
    };
  }

  componentDidMount = () => {
   this.setState({
    movieFavorites: store.getState().movieFavorites,
    movieTitle: localStorage.getItem('movieTitle')
   });
   
   this._fetchFeatureMovie(localStorage.getItem('movieTitle'));
  }

  _fetchFeatureMovie = async (title) => {
    this.setState({
      isLoading: true,
    });
    const response = await omdbServices.fetchMovies(title);
    const movieResponse  = await response.json();
   
    this.setState({
      movies: movieResponse,
      isLoading: false,
    })
  };

  openDetails = (imdbId) => {
  
    localStorage.setItem('movieImdbId', imdbId);
    this._reroute();
  }

  _addMovieToFavs = (movie) => {
    const movieFavoritesArray = store.getState().movieFavorites ? store.getState().movieFavorites: [];
    movieFavoritesArray.push(movie);
    this.props.addMovieToFavs(movieFavoritesArray);

    let watchList = [];
    if (localStorage.getItem('watchList') === null) {
      localStorage.setItem('watchList', JSON.stringify([]));
    } else {
      watchList = JSON.parse(localStorage.getItem('watchList'));
      watchList.push(movie);
      localStorage.setItem('watchList', JSON.stringify(watchList));
    }

    this.setState({
      watchList: JSON.parse(localStorage.getItem('watchList'))
    });
  }

  _reroute = () => {
    this.props.history.push("/details");
  }
  
  render = () => {

    console.log(this.state.movies.Search);
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
              {this.state.movies.Search && <SearchResults addMovieToFavs={this._addMovieToFavs} movies={this.state.movies.Search} />}
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
    addMovieToFavs: (data) => dispatch(addMovieToFavs(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));

import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';

import store from '../store';
import Header from './Header';
import omdbServices from '../services/omdb';
import { setMovieImdbId, addMovieToFavs } from "../actions/movieAction";
import SearchResults from "../modules/SearchResults";

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
      movieImdbId: 0
    };

    store.subscribe(() => {
      // When state will be updated(in our case, when items will be fetched), 
      // we will update local component state and force component to rerender 
      // with new data.
     console.log(store.getState());
    
     })
  }

  componentDidMount = () => {
   console.log("Loaded");
   this.setState({
    movieFavorites: store.getState().movieFavorites,
    movieTitle: localStorage.getItem('movieTitle')
   });
   
   this._fetchFeatureMovie(localStorage.getItem('movieTitle'));
  }

  _fetchFeatureMovie = async (title) => {
    console.log("RE-GET");
    this.setState({
      isLoading: true,
    });
    const response = await omdbServices.fetchMovies(title);
    const movieResponse  = await response.json();
   
    this.setState({
      movies: movieResponse,
      isLoading: false,
      //title: store.getState().movieTitle,
      //movieTitle: store.getState().movieTitle
    })

    console.log(this.state.movies);
  };

  openDetails = (imdbId) => {
    console.log(imdbId);
    //this.props.setMovieImdbId(imdbId);
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

    console.log(localStorage.getItem('watchList'));
    console.log(watchList);

    
    //const movies = store.getState().movieFavorites;
    //const myFavs = movies ? movies.push(movie): [movie];

  }

  _reroute = () => {
    console.log('REROUE');
    this.props.history.push("/details");
  }
  
  render = () => {
    return (
      <div className="mf-template">
        <div className="header">
          <Header />
        </div>

        <div className="search-panel">
          <div className="search-results">
            {this.state.movies.Search && <SearchResults addMovieToFavs={this._addMovieToFavs} movies={this.state.movies.Search} />}
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

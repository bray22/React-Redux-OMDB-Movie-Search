import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Header from './Header';
import store from '../store';
import omdbServices from '../services/omdb';
import FeaturedMovie from '../modules/FeaturedMovie';
import WatchList from '../modules/WatchList';

//import Vin from './Vin';

class Details extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      data: {},
      movie: {},
      watchList: JSON.parse(localStorage.getItem('watchList'))
    };
  }

  componentDidMount = () => {
    const movieImdbId = localStorage.getItem('movieImdbId');
    this._fetchMovieByImdbId(movieImdbId);
    
  };

  componentDidUpdate = () => {
    console.log(this.state);
  }

  _addMovieToFavs = (movie) => {
    const movieFavoritesArray = store.getState().movieFavorites ? store.getState().movieFavorites: [];
    movieFavoritesArray.push(movie);

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

  _fetchMovieByImdbId = async (movieImdbId) => {
    this.setState({
      isLoading: true,
    });
    const response = await omdbServices.fetchMovieByImdbId(movieImdbId);
    const movieResponse  = await response.json();
   
    this.setState({
      movie: movieResponse,
      isLoading: false,
    })
  };

  render = () => {
   
   return (
    <div className="mf-template">
      <div className="header">
        <Header />
      </div>
      <div className="home-center">
        <div className="home-left">
          <FeaturedMovie movie={this.state.movie} addMovieToFavs={this._addMovieToFavs} />
        </div>
        <div className="home-right">
          <WatchList movies={this.state.watchList} />
        </div>
      </div>
    </div>
  );
};

}

export default Details;

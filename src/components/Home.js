import React, { Component } from 'react';

import store from '../store';
import  Header  from './Header';
import omdbServices from '../services/omdb';
import WatchList from '../modules/WatchList';
import FeaturedMovie from '../modules/FeaturedMovie';
import { removeWatchListItem } from '../utils/watchListUtils';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: {},
      movieTitle: 'The Godfather',
      featuredMovie: {},
      watchList: JSON.parse(localStorage.getItem('watchList'))
    };
  }

  componentDidMount = () => {
    this._fetchFeatureMovie();
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

   _fetchFeatureMovie = async (title) => {
    const response = await omdbServices.fetchFeatureMovie();
    const movieResponse  = await response.json();
   
    this.setState({
      featuredMovie: movieResponse,
      isLoading: false,
    })
  };

  _removeWatchListItem = (title) => {
    this.setState({
      data: removeWatchListItem(title)
    });
  }

  render = () => {
    
    return (
      <div className="mf-template">
        <div className="header">
          <Header />
        </div>
        <div className="home-center">
          <div className="home-left">
            <FeaturedMovie movie={this.state.featuredMovie} addMovieToFavs={this._addMovieToFavs} />
          </div>
          <div className="home-right">
            <WatchList movies={this.state.watchList} />
          </div>
        </div>
      </div>
    );
  };
}

export default Home;

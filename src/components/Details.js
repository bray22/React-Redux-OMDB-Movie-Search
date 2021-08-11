import React, { Component } from 'react';

import store from '../store';
import Header from './Header';
import parseJson from 'parse-json';
import omdbServices from '../services/omdb';
import WatchList from '../modules/WatchList';
import FeaturedMovie from '../modules/FeaturedMovie';

class Details extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      data: {},
      movie: {},
      watchList: []
    };
  }

  componentDidMount = () => {
    const movieImdbId = localStorage.getItem('movieImdbId');

    this.setState({
      watchList: parseJson(localStorage.getItem('watchList'))
    });
    
    this._fetchMovieByImdbId(movieImdbId);
  };


  _addMovieToWatchList = (movie) => {
    const watchListArray = store.getState().movieWatchList ? store.getState().movieWatchList: [];
    watchListArray.push(movie);

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
          <FeaturedMovie movie={this.state.movie} addMovieToWatchList={this._addMovieToWatchList} />
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

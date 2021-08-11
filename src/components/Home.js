import React, { Component } from 'react';

import store from '../store';
import  Header  from './Header';
import parseJson from 'parse-json';
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
      featuredMovie: {},
      watchList: []
    };
  }

  componentDidMount = () => {
    this.setState({
      watchList: parseJson(localStorage.getItem('watchList')),
    });
    this._fetchFeatureMovie();
   }

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
            <FeaturedMovie movie={this.state.featuredMovie} addMovieToWatchList={this._addMovieToWatchList} />
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

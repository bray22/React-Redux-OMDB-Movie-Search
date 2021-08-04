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

  _fetchMovieByImdbId = async (movieImdbId) => {
    this.setState({
      isLoading: true,
    });
    const response = await omdbServices.fetchMovieByImdbId(movieImdbId);
    const movieResponse  = await response.json();
   
    this.setState({
      movie: movieResponse,
      isLoading: false,
      //title: store.getState().movieTitle,
      //movieTitle: store.getState().movieTitle
    })

    console.log(this.state.movie);
  };

  render = () => {
   // const { isLoading, data, activeTab } = this.state;
   return (
    <div className="mf-template">
      <div className="header">
        <Header />
      </div>
      <div className="home-center">
        <div className="home-left">
          <FeaturedMovie movie={this.state.movie} />
        </div>
        <div className="home-right">
          <WatchList movies={this.state.watchList} />
        </div>
      </div>
    </div>
  );
};
    // return (
    //   <div className="mf-template">
    //     <div className="header">
    //       <Header />
    //     </div>
    //     <h2>Details</h2>
    //     <h2>IMDB: { store.getState().movieImdbId }</h2>
    //     <h2>{ this.state.movie.Title }</h2>
    //     <h2>{ this.state.movie.Year }</h2>
    //     <Link to={`/`}>Home</Link>
    //   </div>
    // );
  

  setData = data => {
    this.setState({
      data,
    });
  };
}

export default Details;

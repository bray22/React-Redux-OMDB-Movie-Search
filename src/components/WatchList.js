import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Header from './Header';
import store from '../store';
import { removeWatchListItem } from '../utils/watchListUtils';

//import Vin from './Vin';

class WatchList extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      data: {},
    };
  }

  _deleteFromWatchList = (title) => {
    this.setState({
      // singleton util call
      data: removeWatchListItem(title)
    });
  }

  render = () => {
    const watchList = JSON.parse(localStorage.getItem('watchList'));

    return (
      <div className="mf-template">
        <div className="header">
          <Header />
        </div>

        <div className="search-panel">
          <div className="search-results">
          { watchList.map( (movie) => {
          return <p key="0">{movie.Title} <span onClick={() => this._deleteFromWatchList(movie.Title)}>remove</span></p>
        })}
          </div>
        </div>
      </div>
    );
    // return (
    //   <div className="mf-template">
    //     <div className="header">
    //       <Header />
    //     </div>
    //     <h2>WatchList</h2>
    //     <Link to={`/`}>Home</Link>

    //     <h2>Favorites</h2>
    //     { watchList.map( (movie) => {
    //       return <p key="0">{movie.Title} <span onClick={() => this._deleteFromWatchList(movie.Title)}>remove</span></p>
    //     })}
    //   </div>
    // );
  };
}

export default WatchList;

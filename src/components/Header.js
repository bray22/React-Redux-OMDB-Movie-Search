import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import { setMovies } from "../actions/movieAction";

const Header = () => {
  const _redirectHome = () => {
    window.location.href = '/';
  }

  const _setMovieTitle = (e) => {
    const title = e.target.value;
    if (e.key === 'Enter') {
       localStorage.setItem('movieTitle', title);
       window.location.href = '/search';
    }
  }
    return (
      <div className="header-wrapper">
        <div onClick={() => _redirectHome()} className="logo">
        </div>
        <div className="search-wrapper">
          <input type="text" name="search" width="50%" onKeyDown={_setMovieTitle}></input>
        </div>
        <div className="right">
        
        <div className="header-links"><Link to={`/watchlist`}>Watch List</Link> |  Benjamin Ray</div>

        </div>
        
      </div>
    );
}

const mapStateToProps = state => {
  return {
    rotating: state.movieTitle,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //setMovieTitle: (data) => dispatch(setMovieTitle(data)),
    setMovies: (data) => dispatch(setMovies(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

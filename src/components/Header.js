import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import React from 'react';

import omdbServices from '../services/omdb';
import { setMovieTitle } from "../actions/movieAction";
import { setMovies } from "../actions/movieAction";

import { useHistory } from 'react-router-dom';


import store from '../store';

const Header = (props) => {
  const history = useHistory();

  const _reroute = () => {
    console.log('REROUE');
    window.location.href = '/search';
  }

  const _redirectHome = () => {
    window.location.href = '/';
  }

  const _setMovieTitle = (e) => {
    const title = e.target.value;
    if (e.key === 'Enter') {
       //props.setMovieTitle(title);
       console.log(title);
       localStorage.setItem('movieTitle', title);
       
       _reroute(); 
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

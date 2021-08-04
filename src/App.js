
import React from "react";

import "./App.scss";
import Router from './Router';
import { connect } from "react-redux";

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    movieTitle: state.movieTitle,
  }
}

export default connect(mapStateToProps)(App);
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Header from './Header';

//import Vin from './Vin';

class WatchList extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      data: {},
    };
  }

  componentDidMount = () => {
    //this._fetchData();
  };

  render = () => {
   // const { isLoading, data, activeTab } = this.state;

    return (
      <div className="mf-template">
        <div className="header">
          <Header />
        </div>
        <h2>404</h2>
        <Link to={`/`}>Home</Link>
      </div>
    );
  };

  setData = data => {
    this.setState({
      data,
    });
  };
}

export default WatchList;

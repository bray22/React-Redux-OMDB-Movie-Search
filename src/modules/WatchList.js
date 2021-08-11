import { withRouter } from 'react-router-dom';

const WatchList = (props) => {
  const openDetails = (imdbID) => {
    localStorage.setItem('movieImdbId', imdbID);
    window.location.href = '/details';
  }
  return (
    <div className="watchlist-wrapper">
      <h3>Watch List</h3>
      { props.movies.map( (movie, i) => {
        return (
        <div key={i} className="search-results-row">
          <div key={`title${i}`} className="movie-title" onClick={() => openDetails(movie.imdbID)}>{movie.Title}</div>
          <div key={`year${i}`} className="movie-year" onClick={() => openDetails(movie.imdbID)}>{movie.Year}</div>
        </div>
        )
      })}

    </div>
  );
};

export default withRouter(WatchList);

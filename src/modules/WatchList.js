import { withRouter } from 'react-router-dom';

const WatchList = (props) => {
  const openDetails = (imdbID) => {
    localStorage.setItem('movieImdbId', imdbID);
    props.history.push("/details");
    window.location.href = '/details';
  }
  return (
    <div className="watchlist-wrapper">
      <h3>Watch List</h3>
      { props.movies.map( (movie, i) => {
        return <><p key={i} onClick={() => openDetails(movie.imdbID)}>{movie.Title}</p> <hr /></>
      })}

    </div>
  );
};

export default withRouter(WatchList);

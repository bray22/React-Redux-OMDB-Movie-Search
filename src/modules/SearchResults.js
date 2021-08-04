const SearchResults = (props) => {
  const _reroute = () => {
    console.log('REROUE');
    this.props.history.push("/details");
  }

  const openDetails = (imdbId) => {
    console.log(imdbId);
    //this.props.setMovieImdbId(imdbId);
    localStorage.setItem('movieImdbId', imdbId);
    window.location.href = '/details';
  }
  const watchList = JSON.parse(localStorage.getItem('watchList'));
  //const { Title, Poster, Plot, Director, Writer } = props.movie;
  return (props.movies && props.movies.map( (movie) =>
    <>
      <div className="search-results-row">
        <div className="movie-title" onClick={() => openDetails(movie.imdbID)}>{movie.Title}</div>
        <div className="add-watchlist" onClick={() => props.addMovieToFavs(movie)}>Add</div> 
      </div>
    
    </>
  ))
};

export default SearchResults;

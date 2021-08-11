const initialState = {
  movieTitle: false,
  movieImdbId: 0,
  movieWatchList: []
}

/* receive action and payload 
and return new state with updates */

const movieReducer = (state=initialState, action) => {
  switch (action.type) {
    case "movieTitle":
      return {
        movieTitle: action.payload
    };
    case "watchListMovie":
      return {
        movieWatchList: action.payload
    };
    case "moviesSearch":
      return {
        movies: action.payload
    };
    case "movieImdbId":
      return {
        movieImdbId: action.payload
    };
    default:
      return state;
  }
};

export default movieReducer;
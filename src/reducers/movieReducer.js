const initialState = {
  movieTitle: false,
  movieImdbId: 0,
  movieFavorites: []
}

const movieReducer = (state=initialState, action) => {
  switch (action.type) {
    case "movie":
      return {
        movieTitle: action.payload
    };
    case "favorite":
      return {
        movieFavorites: action.payload
    };
    case "imdbId":
      return {
        movieImdbId: action.payload
    };
    default:
      return state;
  }
};

export default movieReducer;
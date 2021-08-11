import PropTypes from 'prop-types';
import { searchConstants } from '../constants/search';

/* return single movie object from imdbId
  RequestInfo:
  title: string
  apikey: string (const)

  response: {
    movie: Promise<Response>
  }
*/
const fetchFeatureMovie = async () => {
  const randomFeatureMovie = searchConstants.FEATURE[Math.floor(Math.random() * searchConstants.FEATURE.length)];

  const url = `${searchConstants.OMDB_URL}/?t=${randomFeatureMovie}&apikey=${searchConstants.API_KEY}`

  const response = await fetch(url);
  return response;
};

/* return single movie object from imdbId
  RequestInfo:
  imdbId: string
  apikey: string (const)

  response: {
    movie: Promise<Response>
  }
*/
const fetchMovieByImdbId = async (imdbId) => {
  const url = `${searchConstants.OMDB_URL}/?i=${imdbId}&apikey=${searchConstants.API_KEY}`

  const movie = await fetch(url);
  return movie;
};

/* return array of movie objects from title
  RequestInfo:
  apikey: string (const)
  title: string (required)

  response: {
    movies: Promise<Response>
  }
*/
const fetchMoviesByTitle = async (title) => {
  const url = `${searchConstants.OMDB_URL}/?s=${title}&apikey=${searchConstants.API_KEY}`

  const movies = await fetch(url);
  return movies;
};

const omdbServices = {
  fetchFeatureMovie,
  fetchMoviesByTitle,
  fetchMovieByImdbId
};

/* search prop types */
omdbServices.propTypes = {
  title: PropTypes.string,
};

export default omdbServices;
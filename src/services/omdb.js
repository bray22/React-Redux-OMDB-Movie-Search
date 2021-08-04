import React, { Component } from 'react';

import { searchConstants } from '../constants/search';

const fetchFeatureMovie = async () => {
  const url = `${searchConstants.OMDB_URL}/?t=${searchConstants.FEATURE}&apikey=${searchConstants.API_KEY}`

  const response = await fetch(url);
  return response;
};

const fetchMovieByImdbId = async (imdbId) => {
  const url = `${searchConstants.OMDB_URL}/?i=${imdbId}&apikey=${searchConstants.API_KEY}`

  const response = await fetch(url);
  return response;
};

const fetchMovies = async (title) => {
  const url = `${searchConstants.OMDB_URL}/?s=${title}&apikey=${searchConstants.API_KEY}`

  const response = await fetch(url);
  return response;
};

const omdbServices = {
  fetchMovies,
  fetchFeatureMovie,
  fetchMovieByImdbId
};

export default omdbServices;
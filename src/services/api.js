import axios from 'axios';

const APP_KEY = process.env.REACT_APP_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getMovies = async ( type, page ) => { 
  const url = `${BASE_URL}/movie/${type}?api_key=${APP_KEY}&page=${page}`
  try {
    const response = await axios.get(url, {
      params: {
        language:'en-US',
      }
    })

    const movies = response.data;
    return movies
  }
  catch(error) {
    throw error
  }
}

export const searchQuery = async ( type, query, page ) => { 
  const url = `${BASE_URL}/search/${type}?api_key=${APP_KEY}&page=${page}&query=${query}`

  try {
    const response2 = await axios.get(url, {
      params: {
        language:'en-US',
        include_adult:false
      }
    })
    console.log('response2', response2)

    const result = response2.data
    return result;
  }
  catch(error) {
    throw error
  }
}

export const getTvs = async ( type, page ) => { 
  const url = `${BASE_URL}/tv/${type}?api_key=${APP_KEY}&page=${page}`

  try {
    const response3 = await axios.get(url, {
      params: {
        language:'en-US',
      }
    })
    console.log('response3', response3)

    const tvs = response3.data
    return tvs
  }
  catch(error) {
    throw error
  }
}
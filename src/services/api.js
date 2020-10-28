import axios from 'axios';

import {APP_KEY, BASE_URL} from '../config/api_config';


export const getMovies = async (type) => { 
  const url = `${BASE_URL}/movie/${type}`

  try {
    const response = await axios.get(url, {
      params: {
        // query:query,
        api_key:APP_KEY,
        language:'en-US',
        page:1
      }
    })
    console.log('response', response)

    const movies = response.data.results
    return movies
  }
  catch(error) {
    throw error
  }
}

export const searchQuery = async (type, query) => { 
  const url = `${BASE_URL}/search/${type}`

  try {
    const response2 = await axios.get(url, {
      params: {
        query:query,
        api_key:APP_KEY,
        language:'en-US',
        page:1,
        include_adult:false
      }
    })
    console.log('response2', response2)

    const result = response2.data.results
    return result
  }
  catch(error) {
    throw error
  }
}
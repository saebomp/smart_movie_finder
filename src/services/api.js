import axios from 'axios';

import {APP_KEY, BASE_URL} from '../config/api_config';


export const getMovies = async (type, genre) => {

  // const {data:{results}} = await axios.get(`https://api.themoviedb.org/3/movie/${this.state.type}?api_key=${API}&page=${this.state.page}`)

  // this.setState({movies:results, isLoading: false}) 
  const url = `${BASE_URL}/${genre}/${type}`

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
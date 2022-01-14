import axios from 'axios';

const APP_KEY = process.env.REACT_APP_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getResult = async ( type, page, is_type ) => { 
  const url = `${BASE_URL}/${is_type}/${type}?api_key=${APP_KEY}&page=${page}`

  try {
    const response3 = await axios.get(url, {
      params: {
        language:'en-US',
        include_adult:false
      }
    })

    const tvs = response3.data
    return tvs
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

    const result = response2.data
    return result;
  }
  catch(error) {
    throw error
  }
}

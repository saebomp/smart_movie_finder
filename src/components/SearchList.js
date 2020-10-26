import axios from 'axios';
import React from 'react';

import noimage from '../images/noimage.png'

class SearchList extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
      tvGenre: [],
      movieGenre:[]
    }

  // getGenre = async () => {
  //   const {data:{genres}} = await axios.get(`https://api.themoviedb.org/3/genre/${this.state.type}/list?api_key=45ffcc6c9ffc640faa6714543e2fc6a3`)
  //   this.setState({genre:genres})
  // }

  // componentDidMount() {
  //   this.getGenre();
  // }

  async componentDidMount() {
    try {
      const [firstResponse, secondResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=45ffcc6c9ffc640faa6714543e2fc6a3`),
        axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=45ffcc6c9ffc640faa6714543e2fc6a3`)
      ]);
      this.setState({tvGenre:firstResponse.data.genres, movieGenre:secondResponse.data.genres})
    }
    catch (err) {
      console.log('error', err)
    }
  }




render() {
  let genre_data = [];
  const {tvGenre, movieGenre} = this.state;
  const {title, original_name, poster_path, release_date, first_air_date, overview} = this.props;
  tvGenre.map(el =>genre_data[el.id] = el.name);
  movieGenre.map(el =>genre_data[el.id] = el.name);
  console.log(genre_data);
  
  return (
    <ul className="movieList">
      {/* <li>{key}</li> */}
      <li>
        {poster_path ?
        <img alt={title} src={`https://image.tmdb.org/t/p/w500${poster_path}`} className="movieImg" />
        : 
        <img src={noimage} style={{maxWidth:'100%', borderRadius:'13px'}}/>
        } 
      </li>
      {title ?
      <li className="title">{title}</li>
      :
      <li className="title">{original_name}</li>
      } 
      <li className="genre">
        {this.props && this.props.genre_ids && this.props.genre_ids.map(id => (
        <span>{genre_data[id]}</span>
      ))}</li>
      {release_date ?
      <li className="date">Release date : {release_date}</li>
      :
      <li className="date">First_air_date : {first_air_date}</li>
      } 
      <li>{overview}</li>
    </ul>
  )

  
}
}

export default SearchList;


//image source
//https://www.flaticon.com/free-icon/image_1829552?term=image&page=1&position=32

//Tv show genre id api
//https://api.themoviedb.org/3/genre/tv/list?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US


//
// How to set state from Multiple API call
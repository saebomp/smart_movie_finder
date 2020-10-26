import axios from 'axios';
import React from 'react';

import noimage from '../images/noimage.png'

class TvList extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
      genre: []
    }

  getGenre = async () => {
    const {data:{genres}} = await axios.get("https://api.themoviedb.org/3/genre/tv/list?api_key=45ffcc6c9ffc640faa6714543e2fc6a3")
    this.setState({genre:genres})
}
  componentDidMount() {
    this.getGenre();
  }


render() {
  let genre_data = [];
  const {genre} = this.state;
  const {original_name, poster_path, genre_ids, first_air_date, overview} = this.props;
  genre.map(el =>genre_data[el.id] = el.name);

  
  return (
    <>
    <ul className="movieList">
      {/* <li>{key}</li> */}
      <li>
        {poster_path ?
        <img alt={original_name} src={`https://image.tmdb.org/t/p/w500${poster_path}`} className="movieImg" />
        : 
        <img src={noimage} style={{maxWidth:'100%', borderRadius:'13px'}}/>
        } 
      </li>
      <li className="title">{original_name}</li>
      <li className="genre">
        {genre_ids.map(id => (
        <span>{genre_data[id]}</span>
      ))}</li>
      <li className="date">First_air_date : {first_air_date}</li>
      <li>{overview}</li>
    </ul>
    </>
  )
}
}

export default TvList;

//image source
//https://www.flaticon.com/free-icon/image_1829552?term=image&page=1&position=32



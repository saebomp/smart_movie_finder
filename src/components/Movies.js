import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
// import Pagination from '@material-ui/lab/Pagination';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';

import MovieList from './MovieList'
import {getMovies} from '../services/api'

//style
import './../App.css';

const styles = (theme) => ({
  selectControl: {
    backgroundColor:'#fff',
    marginRight:3,
    width:200,
    borderRadius:'4px',
    paddingTop:6,
    paddingBottom:6,
    '&:focus' : {
      borderWidth:0,
      backgroundColor: "#FFF"
    },
    '&:hover' : {
      borderWidth:0,
      backgroundColor: "#FFF"
    }
  }
});
class Movies extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    isLoading: false,
    type : 'now_playing',
    movies: [],
    page:1
  }
  this.getType = this.getType.bind(this);
}

 async getType(e) {
  await this.setState({type:e.target.value})
  await this.fetchMovies();
  console.log('this.state.type', this.state.type)
}

  fetchMovies = () => {

    const {type} = this.state

    this.setState({
      isLoading:true
    })

    getMovies(type).then(
      movies => {
        this.setState({
          isLoading:false,
          type:type,
          movies
        })
      },
      error => {
        alert('Error', `Something went Wrong ${error}`)
      } 
    )
  }

  componentDidMount() {
    this.fetchMovies();
  }

  render() {
    const { classes } = this.props;
    const { movies } = this.state;
   
    // const add = () => {
    //   this.setState({page:this.state.page+1})
    //   this.fetchMovies();
    // }
    // const minus = () => {
    //   this.setState({page:this.state.page-1})
    //   this.fetchMovies();
    // }

    return (
    <div className="wrapper">
      <div className="heading">
        <div>Movies</div>
        <div>
          <Select
            className={classes.selectControl}
            onChange={this.getType}
            defaultValue="now_playing"
            value={this.state.type}
          > 
            <MenuItem value="now_playing">Now-playing</MenuItem>
            <MenuItem value="popular">Popular</MenuItem>
            <MenuItem value="top_rated">Top-rated</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
          </Select>
        </div>
        </div>
        <div className="movieWrapper">
        {movies.map( (movie, index) => (
          <MovieList
            key={index}
            title={movie.title} 
            release_date={movie.release_date} 
            popularity={movie.popularity} 
            overview={movie.overview} 
            poster_path={movie.poster_path}
          />
        ))}
      </div>
      {/* <div className="pagination">
        <SkipPreviousRoundedIcon 
          fontSize="large" 
          style={{color:"#dedede"}}
          onClick={minus}
        />
          <span>{this.state.page}</span> 
        <SkipNextRoundedIcon 
          fontSize="large" 
          style={{color:"#dedede"}}
          onClick={add}
        />
      </div> */}
    </div>
    );
  }
}

    
export default withStyles(styles)(Movies);
//now-playing
//https://api.themoviedb.org/3/movie/now_playing?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US&page=1

//popular
//https://api.themoviedb.org/3/movie/popular?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US&page=1

//top rated
//https://api.themoviedb.org/3/movie/top_rated?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US&page=1

//upcoming
//https://api.themoviedb.org/3/movie/upcoming?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US&page=1


//https://stackoverflow.com/questions/28868071/onchange-event-using-react-js-for-drop-down

//https://stackoverflow.com/questions/60265378/onchange-for-storing-value-of-selected-drop-down-option

//Material UI SelectField onChange not working
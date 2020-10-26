import React from 'react';
import axios from "axios";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
// import Pagination from '@material-ui/lab/Pagination';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';

import MovieList from './MovieList'

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
  state = {
    isLoading: true,
    movies: [],
    type:'popular',
    page:1
  }

  getMovies = async () => {
    const API = "45ffcc6c9ffc640faa6714543e2fc6a3";
    const {data:{results}} = await axios.get(`https://api.themoviedb.org/3/movie/${this.state.type}?api_key=${API}&page=${this.state.page}`)
    
    //데이터를 불러오기도전에 함수가 실행되는걸 막기위해 axios 씀..?
    // instead of  console.log(movies.data.results) 
    // cost movies = await ~~   use {data:{results}}
    // console.log(results);

    this.setState({movies:results, isLoading: false}) 
  }

  componentDidMount() {
    this.getMovies();
  }
  

  render() {
    const { classes } = this.props;
    const {isLoading, movies} = this.state;


    const updateType = e => {
      e.preventDefault();
      this.setState({type:e.target.value})
      // console.log('type', this.state)
    }
    const getType = e => {
      e.preventDefault();
      this.setState({type:e.target.value})
      this.getMovies();
      // this.setState({result:[]})
    }
    const add = () => {
      this.setState({page:this.state.page+1})
      this.getMovies();
    }
    const minus = () => {
      this.setState({page:this.state.page-1})
      this.getMovies();
    }

    return (
    <div className="wrapper">
      <div className="heading">
        <div>Movies</div>
        <div>
          <form 
            className="inputWrapper" 
            onSubmit = {getType}
            >
            <Select
              className={classes.selectControl}
              onChange={updateType}
              defaultValue="now_playing"
            > 
              <MenuItem value="now_playing">Now-playing</MenuItem>
              <MenuItem value="popular">Popular</MenuItem>
              <MenuItem value="top_rated">Top-rated</MenuItem>
              <MenuItem value="upcoming">Upcoming</MenuItem>
            </Select>
            <Button 
              variant="contained"
              type="submit"
              value="submit"
            >
            <SearchIcon 
            fontSize="small" 
            />
            </Button>
          </form> 
        </div>
        </div>
        <div className="movieWrapper">
        {movies.map( (movie, index) => (
          <MovieList
            key={index}
            title={movie.title} 
            release_date={movie.release_date} 
            overview={movie.overview} 
            poster_path={movie.poster_path}
          />
        ))}
      </div>
      <div className="pagination">
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
      </div>
    </div>
    );
  }
}

    
export default withStyles(styles)(Movies);

//popular
//https://api.themoviedb.org/3/movie/popular?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US&page=1

//top rated
//https://api.themoviedb.org/3/movie/top_rated?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US&page=1

//upcoming
//https://api.themoviedb.org/3/movie/upcoming?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US&page=1

//https://stackoverflow.com/questions/38839510/forcing-a-react-router-link-to-load-a-page-even-if-were-already-on-that-page

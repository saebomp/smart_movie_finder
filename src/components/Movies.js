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
  state = {
    type : 'now_playing',
    isLoading: false,
    movies: [],
    page:1,
    genre :'movie'
  }


  getType = e => {
    const {type,genre} = this.state
    e.preventDefault()
    this.setState({type:e.target.value})

    this.setState({
      isLoading:true
    })

    getMovies(type, genre).then(
      movies => {
        this.setState({
          type:type,
          movies,
          isLoading:false,
          genre:'movie'
        })
      },
      error => {
        alert('Error', `Something went Wrong ${error}`)
      } 
    )
  }


  updateType = e => {
    this.setState({type:e.target.value})
    console.log('type', this.state)
  }

  // componentDidMount() {
  //   this.getType();
  // }


  render() {
    const { classes } = this.props;
    const {movies} = this.state;

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
            onSubmit = {this.getType}
            >
            <Select
              className={classes.selectControl}
              onChange={this.updateType}
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
            popularity={movie.popularity} 
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

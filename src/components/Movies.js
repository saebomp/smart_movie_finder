import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import MovieList from './MovieList'
import Pagination from './Pagination'
import {getMovies} from '../services/api'

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
    },
  }
});
class Movies extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    type : 'now_playing',
    movies: [],
    limit1: 0,
    limit2 : 10
  }
  this.getType = this.getType.bind(this);
}

  async getType(e) {
    await this.setState({type:e.target.value})
    this.fetchMovies(this.setState({limit1:0, limit2:10}));
  }

  handleNextPage = (e) => {
    e.preventDefault();
    this.fetchMovies(this.setState({limit1:10, limit2:20}));
  }

  handlePrevPage = (e) => {
    e.preventDefault();
    this.fetchMovies(this.setState({limit1:0, limit2:10}));
  }

  fetchMovies = () => {
    const {type} = this.state

    getMovies(type).then(
      movies => {
        this.setState({
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
    const { movies, limit1, limit2} = this.state;

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
          {movies.slice(limit1, limit2).map( (movie, index) => (
            <MovieList
              key={index}
              title={movie.title} 
              release_date={movie.release_date} 
              popularity={movie.popularity} 
              overview={movie.overview} 
              poster_path={movie.poster_path}
            />
          ))}
          <Pagination 
            limit2={limit2}
            handleNextPage={this.handleNextPage}
            handlePrevPage={this.handlePrevPage}
          />
        </div>
      </div>
    );
  }
}

    
export default withStyles(styles)(Movies);

//Reference
// https://medium.com/@ian.mundy/async-event-handlers-in-react-a1590ed24399
// https://joshua1988.github.io/web-development/javascript/js-async-await/#async--await%EB%8A%94-%EB%AD%94%EA%B0%80%EC%9A%94
// https://stackoverflow.com/questions/54419220/react-native-display-x-number-of-rows-from-an-array
// https://stackoverflow.com/questions/63193903/react-limit-api-results-and-view-more-items
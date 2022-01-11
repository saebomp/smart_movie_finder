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
    page:1,
    total_pages:'',
    id:''
  }
  this.getType = this.getType.bind(this);
  this.handlePageClick = this.handlePageClick.bind(this);
}

  async handlePageClick(e) {
    await this.setState({page:e.selected+1})
    this.fetchMovies();
  }

  async getType(e) {
    await this.setState({type:e.target.value})
    this.fetchMovies();
  }

  fetchMovies = () => {
    const {type,page} = this.state

    getMovies(type,page).then(
      movies => {
        this.setState({
          type:type,
          movies:[...movies.results],
          total_pages:movies.total_pages,
          page:page,
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
  // componentDidMount() 메서드는 컴포넌트 출력물이 DOM에 렌더링 된 후에 실행됩니다. 
  
  render() {
    const { classes } = this.props;
    const { movies} = this.state;

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
              id={movie.id}
            />
          ))}
          <Pagination 
            total_pages={this.state.total_pages}
            page={this.state.page}
            handlePageClick={this.handlePageClick}
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
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import MovieList from './MovieList'
import Pagination from './Pagination'
import ScrollToTop from './ScrollToTop'
import AddFavourites from './AddFavourites';
import {getResult} from '../services/api'

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
    id:'',
    is_visible: false,
    is_type:'movie',
    favoriteList:{},
    favoriteBtn:false
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
    const {type,page,is_type} = this.state

    getResult(type,page,is_type).then(
      movies => {
        this.setState({
          type:type,
          movies:[...movies.results],
          total_pages:movies.total_pages,
          page:page,
          is_type:is_type
        })
      },
      error => {
        alert('Error', `Something went Wrong ${error}`)
      } 
    )
  }

  toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      this.setState({
        is_visible: true
      });
    } else {
      this.setState({
        is_visible: false
      });
    }
  }

  addFavouriteMovie = (movie) => {
		const newFavouriteList = {...movie};
		this.setState({favoriteList:{newFavouriteList}, favoriteBtn:!this.state.favoriteBtn})
	};

  componentDidMount() {
    this.fetchMovies();
    document.addEventListener("scroll", this.toggleVisibility)
    
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
              movie={movie}
              // favouriteComponent={AddFavourites}
              handleFavouritesClick={this.addFavouriteMovie}
              favoriteBtn={this.state.favoriteBtn}
            />
          ))}
          <Pagination 
            total_pages={this.state.total_pages}
            page={this.state.page}
            handlePageClick={this.handlePageClick}
          />
          <ScrollToTop
            is_visible={this.state.is_visible}
          />
        </div>
      </div>
    );
  }
}

    
export default withStyles(styles)(Movies);

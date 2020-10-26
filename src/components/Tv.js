import React from 'react';
import axios from "axios";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import TvList from './TvList'

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
class Tv extends React.Component {
  state = {
    // isLoading: true,
    movies: [],
    type:'popular'
  }

  getTvs = async () => {
    const API = "45ffcc6c9ffc640faa6714543e2fc6a3";
    const {data:{results}} = await axios.get(`https://api.themoviedb.org/3/tv/${this.state.type}?api_key=${API}`)

    this.setState({movies:results}) 
  }

  componentDidMount() {
    this.getTvs();
  }

  render() {
    const { classes } = this.props;
    const {movies} = this.state;


    const updateType = e => {
      e.preventDefault();
      this.setState({type:e.target.value})
      // console.log('type', this.state)
    }
    const getType = e => {
      e.preventDefault();
      this.setState({type:e.target.value})
      this.getTvs();
      // this.setState({result:[]})
    }

    return (
    <div className="wrapper">
      <div className="heading">
        <div>Tv</div>
        <div>
          <form 
            className="inputWrapper" 
            onSubmit = {getType}
            >
            <Select
              className={classes.selectControl}
              onChange={updateType}
              defaultValue="airing_today"
            > 
              <MenuItem value="airing_today">Airing today</MenuItem>
              <MenuItem value="on_the_air">On the air</MenuItem>
              <MenuItem value="popular">Popular</MenuItem>
              <MenuItem value="top_rated">Top-rated</MenuItem>
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
          <TvList
            key={index}
            original_name={movie.original_name} 
            first_air_date={movie.first_air_date} 
            overview={movie.overview} 
            poster_path={movie.poster_path}
            genre_ids={movie.genre_ids}
          />
        ))}
      </div>
    </div>
    );
  }
}

    
export default withStyles(styles)(Tv);

//https://api.themoviedb.org/3/tv/latest?api_key=<<api_key>>&language=en-US

//https://api.themoviedb.org/3/tv/popular?api_key=<<api_key>>&language=en-US&page=1

//https://api.themoviedb.org/3/tv/top_rated?api_key=<<api_key>>&language=en-US&page=1
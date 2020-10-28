import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";

import SearchList from './SearchList'
import './../App.css';
import {searchQuery} from '../services/api'

const styles = (theme) => ({
  root: {
    backgroundColor:'#fff',
    marginRight:3,
    borderRadius:'4px',
    '& input:valid + fieldset': {
      borderWidth: 0,
    },
    '& input:valid:focus + fieldset': {
      borderWidth:0,
    },
    '& input ' : {
      paddingTop: 15
    },
    '& select:valid + fieldset': {
      borderWidth: 0,
    },
    '& select:valid:focus + fieldset': {
      borderWidth:0,
    },
  },
  selectControl: {
    backgroundColor:'#fff',
    marginRight:3,
    width:100,
    borderRadius:'4px',
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


class Search extends React.Component {
  
  state = {
    isLoading: true,
    result: [],
    query:'',
    type:'movie'
  }

  fetchMulti = e => {
    const {type, query} = this.state
    // this.setState({
    //   isLoading:false
    // })

    searchQuery(type, query).then(
      result => {
        this.setState({
          isLoading:false,
          result,
          query:query,
          type:type
        })
      },
      error => {
        alert('Error', `Something went Wrong ${error}`)
        console.log('error', error)
      } 
    )

  }

  render() {
    const { classes } = this.props;
    const {isLoading, result} = this.state;

    const updateSearch = e => {
      this.setState({query:e.target.value})
      // console.log('plzzzzz', this.state)
    }
    
    const updateType = e => {
      e.preventDefault();
      this.setState({type:e.target.value})
    }

    const getSearch = e => {
      e.preventDefault();
      this.setState({query:e.target.value, type:e.target.value})
      this.fetchMulti();
    }


  return (
    <div className="wrapper">
      <div className="heading">
        <div>Search</div>
        <div>
          <form 
            className="inputWrapper" 
            onSubmit = {getSearch}
            >
            <TextField 
              classes={{root: classes.root}}
              id="filled-size-small"
              size="small"
              placeholder="Search field" 
              type="text" 
              variant="outlined" 
              value={this.state.query} 
              onChange={updateSearch}
            />
            <Select
              className={classes.selectControl}
              onChange={updateType}
              defaultValue="movie"
            >
              <MenuItem value="movie">Movie</MenuItem>
              <MenuItem value="multi">Multi</MenuItem>
              <MenuItem value="tv">TV</MenuItem>
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
      {isLoading ? <div className="isLoading">Search for a movie</div> :
      <div className="movieWrapper">
      
      {result.map( (movie, index) => (
        <SearchList
          key={index}
          title={movie.title} 
          original_name={movie.original_name}
          release_date={movie.release_date} 
          first_air_date={movie.first_air_date}
          popularity={movie.popularity}
          overview={movie.overview} 
          poster_path={movie.poster_path}
          genre_ids={movie.genre_ids}
        />
      ))}
      </div>
    }
    </div>
  );
  }
}

export default withStyles(styles)(Search);



//movie search
//https://api.themoviedb.org/3/search/movie?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US&page=1&include_adult=false&query=${this.state.query}

//tv search
//https://api.themoviedb.org/3/search/tv?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US&page=1&include_adult=false&query=war


//multi
//https://api.themoviedb.org/3/search/multi?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US&page=1&include_adult=false&query=war
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
    type:'movie',
    msg:'Please enter a search'
  }

  fetchMulti = e => {
    const {type, query} = this.state

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
    const {isLoading, result, query, msg} = this.state;

    const updateSearch = e => {
      this.setState({query:e.target.value, msg:'Please initiate a search'})
      // console.log(query)
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
      {/* Loading */}
      {isLoading ? <div className="isLoading">{this.state.msg}</div> :
      <div className="movieWrapper">
        {result.length === 0 ? (<div className="isLoading">Sorry, there were no results</div>)
        :
        result.map( (movie, index) => (
          <SearchList
            key={index}
            title={movie.title} 
            original_name={movie.original_name}
            release_date={movie.release_date} 
            first_air_date={movie.first_air_date}
            popularity={movie.popularity}
            overview={movie.overview} 
            poster_path={movie.poster_path}
          />
        ))
        }
      </div>
    }
    </div>
  );
  }
}

export default withStyles(styles)(Search);



//reference
//https://stackoverflow.com/questions/59144130/create-a-error-message-for-no-results-in-react-js

//Please initiate a search
//show text while typing React
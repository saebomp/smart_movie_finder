import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import SearchList from './SearchList'
import Pagination from './Pagination';
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
  constructor(props) {
  super(props);
  this.state = {
    isLoading: true,
    result: [],
    query:'',
    type:'movie',
    msg:'Please enter a search',
    page:1,
    total_pages:''
  }
  this.handlePageClick = this.handlePageClick.bind(this);
}

  updateSearch = e => {
    this.setState({query:e.target.value, msg:'Please initiate a search', page:1})
  }

  updateType = e => {
    e.preventDefault();
    this.setState({type:e.target.value, page:1})
  }

  getSearch = e => {
    e.preventDefault();
    this.setState({query:e.target.value, type:e.target.value})
    this.fetchMulti(this.setState({page:1}));
  }

  async handlePageClick(e) {
    await this.setState({page:e.selected+1})
    this.fetchMulti();
  }

  fetchMulti = e => {
    const {type, query, page} = this.state

    searchQuery(type, query, page).then(
      result => {
        this.setState({
          isLoading:false,
          result:[...result.results],
          query:query,
          type:type,
          total_pages:result.total_pages,
          page:page
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

  return (
    <div className="wrapper">
      <div className="heading">
        <div>Search</div>
        <div>
          <form 
            className="inputWrapper" 
            onSubmit={this.getSearch}
            >
            <TextField 
              classes={{root: classes.root}}
              id="filled-size-small"
              size="small"
              placeholder="Search field" 
              type="text" 
              variant="outlined" 
              value={this.state.query} 
              onChange={this.updateSearch}
            />
            <Select
              className={classes.selectControl}
              onChange={this.updateType}
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
        ))}
        {result.length >= 1 ?
        <Pagination 
          total_pages={this.state.total_pages}
          page={this.state.page}
          handlePageClick={this.handlePageClick}
        />
        :
        <div></div>
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


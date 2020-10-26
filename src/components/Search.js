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
    searchTitle:'',
    type:''
  }

  searchMovies = async () => {
    const API = "45ffcc6c9ffc640faa6714543e2fc6a3";
    const {data:{results}} = await axios.get(`https://api.themoviedb.org/3/search/${this.state.type}?api_key=${API}&language=en-US&page=1&include_adult=false&query=${this.state.searchTitle}`)
    // console.log(results);
 
    this.setState({result:results, isLoading: false}) 
  }

  componentDidMount() {
    this.searchMovies();
  }

  render() {
    const { classes } = this.props;
    const {isLoading, result} = this.state;

    const updateSearch = e => {
      this.setState({searchTitle:e.target.value})
      // console.log('plzzzzz', this.state)
    }
    
    const updateType = e => {
      e.preventDefault();
      this.setState({type:e.target.value})
      // console.log('type', this.state)
    }

    const getSearch = e => {
      e.preventDefault();
      this.setState({searchTitle:e.target.value, type:e.target.value})
      this.searchMovies();
      // this.setState({result:[]})
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
              value={this.state.searchTitle} 
              onChange={updateSearch}
            />
            <Select
              className={classes.selectControl}
              onChange={updateType}
              defaultValue="Type"
            >
              <MenuItem value="Type">Type</MenuItem>
              <MenuItem value="tv">TV</MenuItem>
              <MenuItem value="movie">Movies</MenuItem>
              <MenuItem value="multi">Both</MenuItem>
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
//https://api.themoviedb.org/3/search/movie?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US&page=1&include_adult=false&query=${this.state.searchTitle}

//tv search
//https://api.themoviedb.org/3/search/tv?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US&page=1&include_adult=false&query=war


//multi
//https://api.themoviedb.org/3/search/multi?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US&page=1&include_adult=false&query=war
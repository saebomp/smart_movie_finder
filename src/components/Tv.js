import React from 'react';
import axios from "axios";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import TvList from './TvList'
import {getTvs} from '../services/api'

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
    isLoading: false,
    type:'airing_today',
    tvs: [],
  }

  fetchTvs = e => {
    const {type} = this.state
    this.setState({
      isLoading:true
    })
    getTvs(type).then (
      tvs => {
        this.setState({
          isLoading:false,
          type:type,
          tvs
        })
      },
      error => {
        alert('Error', `Something went wrong ${error}`)
        console.log('error', error)
      }
    )
  }

  componentDidMount() {
    this.fetchTvs();
  }

  render() {
    const { classes } = this.props;
    const {tvs} = this.state;


    const updateType = e => {
      e.preventDefault();
      this.setState({type:e.target.value})
    }
    const getType = e => {
      e.preventDefault();
      this.setState({type:e.target.value})
      this.fetchTvs();
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
        {tvs.map( (tv, index) => (
          <TvList
            key={index}
            original_name={tv.original_name} 
            first_air_date={tv.first_air_date} 
            popularity={tv.popularity} 
            overview={tv.overview} 
            poster_path={tv.poster_path}
          />
        ))}
      </div>
    </div>
    );
  }
}

    
export default withStyles(styles)(Tv);
//https://api.themoviedb.org/3/tv/airing_today?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US

//https://api.themoviedb.org/3/tv/on_the_air?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US

//https://api.themoviedb.org/3/tv/popular?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US&page=1

//https://api.themoviedb.org/3/tv/top_rated?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US&page=1
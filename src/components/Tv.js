import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

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
  constructor(props){
    super(props);
    this.state = {
    isLoading: false,
    type:'airing_today',
    tvs: [],
  }
  this.getType = this.getType.bind(this);
}

async getType(e) {
  await this.setState({type:e.target.value})
  this.fetchTvs();
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

    return (
    <div className="wrapper">
      <div className="heading">
        <div>Tv</div>
        <div>
          <Select
            className={classes.selectControl}
            onChange={this.getType}
            defaultValue="airing_today"
          > 
            <MenuItem value="airing_today">Airing today</MenuItem>
            <MenuItem value="on_the_air">On the air</MenuItem>
            <MenuItem value="popular">Popular</MenuItem>
            <MenuItem value="top_rated">Top-rated</MenuItem>
          </Select>
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
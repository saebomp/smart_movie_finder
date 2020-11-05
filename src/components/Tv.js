import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import TvList from './TvList'
import Pagination from './Pagination';
import {getTvs} from '../services/api'

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
      type:'airing_today',
      tvs: [],
      limit1: 0,
      limit2: 10
    }
  this.getType = this.getType.bind(this);
}

async getType(e) {
  await this.setState({type:e.target.value})
  this.fetchTvs(this.setState({limit1:0, limit2:10}));
}

handleNextPage = (e) => {
  e.preventDefault();
  this.fetchTvs(this.setState({limit1:10, limit2:20}));
}

handlePrevPage = (e) => {
  e.preventDefault();
  this.fetchTvs(this.setState({limit1:0, limit2:10}));
}

fetchTvs = () => {
  const {type} = this.state

  getTvs(type).then (
    tvs => {
      this.setState({
        type:type,
        tvs,
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
    const {tvs,limit1,limit2} = this.state;

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
        {tvs.slice(limit1, limit2).map( (tv, index) => (
          <TvList
            key={index}
            original_name={tv.original_name} 
            first_air_date={tv.first_air_date} 
            popularity={tv.popularity} 
            overview={tv.overview} 
            poster_path={tv.poster_path}
          />
        ))}
        <Pagination 
          limit1={limit1}
          limit2={limit2}
          handleNextPage={this.handleNextPage}
          handlePrevPage={this.handlePrevPage}
        />
      </div>
    </div>
    );
  }
}

    
export default withStyles(styles)(Tv);


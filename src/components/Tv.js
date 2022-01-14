import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import TvList from './TvList'
import Pagination from './Pagination';
import ScrollToTop from './ScrollToTop';
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
    }
  }
});
class Tv extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type:'airing_today',
      tvs: [],
      page:1,
      total_pages:'',
      is_visible:false,
      is_type:'tv'
    }
  this.getType = this.getType.bind(this);
  this.handlePageClick = this.handlePageClick.bind(this);
  }

  async getType(e) {
    await this.setState({type:e.target.value})
    this.fetchTvs();
  }

  async handlePageClick(e) {
    await this.setState({page:e.selected+1})
    this.fetchTvs();
  }

  fetchTvs = e => {
    const {type,page,is_type} = this.state

    getResult(type,page, is_type).then (
      tvs => {
        this.setState({
          type:type,
          tvs:[...tvs.results],
          total_pages:tvs.total_pages,
          page:page,
          is_type:is_type
        })
      },
      error => {
        alert('Error', `Something went wrong ${error}`)
        console.log('error', error)
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
  componentDidMount() {
    this.fetchTvs();
    document.addEventListener("scroll", this.toggleVisibility)
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
            id={tv.id}
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

    
export default withStyles(styles)(Tv);


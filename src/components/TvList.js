import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import noimage from '../images/noimage.png'

import {APP_KEY, BASE_URL} from '../config/api_config';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom:'20px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  cover: {
    width: '35%',
    height: '38vw',
    [theme.breakpoints.down('xs')]: {
      width:'100%',
      height: '100vw',
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width:'65%',
    [theme.breakpoints.down('xs')]: {
      width:'100%',
    },
  },
  content: {
    flex: '1 auto',
  },
}));

const TvList = ({original_name, poster_path, popularity, first_air_date, overview, id}) => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(()=> {
    getPosts()
  }, [])

  const getPosts = async () => {
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${APP_KEY}`
    try {
      const response = await axios.get(url, {
        params: {
          language:'en-US',
        }
      })
      const posts = response.data
      setPosts(posts)
    }
    catch(error) {
      throw error
    }
  }

  return (
    <Card className={classes.root}>
    {poster_path ?
    <CardMedia
      className={classes.cover}
      image={`https://image.tmdb.org/t/p/w500${poster_path}`}
      title={original_name}
    />
    :
    <CardMedia
      className={classes.cover}
      image={noimage}
      title="no image"
    />
    }
    <div className={classes.details}>
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
          {original_name}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          <span>First_air_date : {first_air_date}</span>
          <span> / Popularity : {popularity}</span>
        </Typography>
        <Typography>
              {posts.genres?.map((el) => (
              <span className="genres">{el.name}</span>
              ))}
          </Typography>
        {overview ?
        <Typography variant="body2" component="p" style={{marginTop:'20px'}}>
          {overview}
        </Typography>
        :
        <Typography variant="body2" component="p" style={{marginTop:'20px'}}>
          No overview provided
        </Typography>
      }   
      </CardContent>
    </div>
    </Card>
  )
}

export default TvList;

//image source
//https://www.flaticon.com/free-icon/image_1829552?term=image&page=1&position=32



import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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

const MovieList = ({title, poster_path, release_date, popularity, overview, id, genre_ids}) => {  
  const classes = useStyles();
  const theme = useTheme();

  const [posts, setPosts] = useState([]);



  useEffect(()=> {
    getPosts()
  }, [])

const getPosts = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${APP_KEY}`
    try {
      const response = await axios.get(url, {
        params: {
          language:'en-US',
        }
      })
      const posts = response.data
      setPosts(posts)
      console.log('thisis new', posts)
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
        title={title}
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
            {title}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            <span>Release date : {release_date}</span>
            <span> / Popularity : {popularity}</span>
          </Typography>
          <Typography>
              {posts.genres?.map((el) => (
              <span className="genres">{el.name}</span>
              ))}
          </Typography>
          <Typography variant="body2" component="p" style={{marginTop:'20px'}}>
            {overview}
          </Typography>
        </CardContent>
      </div>
    </Card>
    )
  }

export default MovieList;

//image source
//https://www.flaticon.com/free-icon/image_1829552?term=image&page=1&position=32


// https://api.themoviedb.org/3/movie/508943?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US
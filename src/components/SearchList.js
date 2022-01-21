import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import noimage from '../images/noimage.png'

const APP_KEY = process.env.REACT_APP_KEY;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom:'20px',
    position:'relative',
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

const SearchList = ({title, original_name, poster_path, popularity, release_date, type, first_air_date, overview, id, genre_ids}) => {
  
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(()=> {
    getPosts()
  }, [])

  const getPosts = async () => {
    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${APP_KEY}`
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
        {title ?
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          :
          <Typography component="h5" variant="h5">
            {original_name}
          </Typography>
          }
           
          <Typography variant="subtitle2" color="textSecondary">
          {release_date ?
            <span>Release date : {release_date}</span>
            :
            <span>First_air_date : {first_air_date}</span>
          }
            <span> / Popularity : {popularity.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
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

export default SearchList;


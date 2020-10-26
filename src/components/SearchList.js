import axios from 'axios';
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import noimage from '../images/noimage.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom:'20px'
  },
  cover: {
    width: '35%',
    height: '38vw',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width:'65%',
  },
  content: {
    flex: '1 auto',
  },
}));

const SearchList = ({title, original_name, poster_path, popularity, release_date, first_air_date, overview}) => {

  const classes = useStyles();
  const theme = useTheme();

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
            <span> / Popularity : {popularity}</span>
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


//image source
//https://www.flaticon.com/free-icon/image_1829552?term=image&page=1&position=32

//Tv show genre id api
//https://api.themoviedb.org/3/genre/tv/list?api_key=45ffcc6c9ffc640faa6714543e2fc6a3&language=en-US


//
// How to set state from Multiple API call
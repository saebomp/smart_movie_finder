import axios from 'axios';
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import noimage from '../images/noimage.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom:'20px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width:'calc(100% - 500px)',
  },
  content: {
    flex: '1 auto',
  },
  cover: {
    width: 500,
    height: 750,
  },

}));

const MovieList = ({title, poster_path, release_date, overview}) => {  
  const classes = useStyles();
  const theme = useTheme();

  return (
    // <>
    // <ul className="movieList">
    //   {/* <li>{key}</li> */}
    //   <li>
    //     {poster_path ?
    //     <img alt={title} src={`https://image.tmdb.org/t/p/w500${poster_path}`} className="movieImg" />
    //     : 
    //     <img alt="noimage" src={noimage} style={{maxWidth:'100%', borderRadius:'13px'}}/>
    //     } 
    //   </li>
    //   <li className="title">{title}</li>
    //   <li className="date">Release date : {release_date}</li>
    //   <li>{overview}</li>
    // </ul>
    // </>


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
          <Typography variant="subtitle1" color="textSecondary">
            Release date : {release_date}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
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



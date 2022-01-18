import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Movies from './components/Movies';
import Tv from './components/Tv';
import Search from './components/Search';

import  "./App.css"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#FFF',
  },
  indicator: {
    backgroundColor: 'transparent',
  },
}));

export default function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs"
          classes={{indicator: classes.indicator}}
          style={{backgroundColor:'#FFF'}}
        >
          <LinkTab label="Movie" href="/Movie" {...a11yProps(0)} style={{color:'#00293b', fontWeight:'bold'}} />
          <LinkTab label="Search" href="/Search" {...a11yProps(1)} style={{color:'#00293b', fontWeight:'bold'}} />
          <LinkTab label="TV" href="/Tv" {...a11yProps(2)}  style={{color:'#00293b', fontWeight:'bold'}} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} className="tab">
        <Movies />
      </TabPanel>
      <TabPanel value={value} index={1} className="tab">
        <Search 
          handleChange={handleChange}
        />
      </TabPanel>
      <TabPanel value={value} index={2} className="tab">
        <Tv />
      </TabPanel>
    </div>
  );
}



//Reference
// https://medium.com/@ian.mundy/async-event-handlers-in-react-a1590ed24399
// https://joshua1988.github.io/web-development/javascript/js-async-await/#async--await%EB%8A%94-%EB%AD%94%EA%B0%80%EC%9A%94
// https://stackoverflow.com/questions/54419220/react-native-display-x-number-of-rows-from-an-array
// https://stackoverflow.com/questions/63193903/react-limit-api-results-and-view-more-items


// https://developers.themoviedb.org/3/getting-started/introduction
// https://www.freecodecamp.org/news/react-movie-app-tutorial/
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
    console.log('newValue',newValue);
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

// API
// https://developers.themoviedb.org/3/movies/get-popular-movies

//할거
//3. styling (셀렉트 박스 밑에 indicator 등)
//5. 어떤 펑션이 뭔지 주석 달것
//6. 마지막에 주석 다 지울것 (packge.json 에서 안쓴거 삭제)
//안쓰는 css 지울것

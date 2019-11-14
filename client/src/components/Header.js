import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import { Link } from 'react-router-dom';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    textShadow: '2px 2px 4px #000000',
    color: 'white'
    
  }, 
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    outline: '1px solid white',
    backgroundColor: '#3f51b5',
    backgroundImage: '-webkit-radial-gradient(left bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)',
    borderRadius: '4px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    textShadow: '2px 2px 4px #000000',
  },
  homeIcon: {
    textDecoration: 'none',
    color: 'white',
  }
}));
   

const Header = (props) => {
    const classes = useStyles();
    return (
        <div>
            
                <Toolbar>
                  <Link to ="/">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <HomeTwoToneIcon fontSize="large" />
                    </IconButton>
                  </Link>
                    <Typography variant="h6" className={classes.title}>UW Tacoma Pantry</Typography>
                    {props.location === '/login' ? null : <Link to="/login" className={classes.link}><Button color="inherit">Admin Login</Button></Link>}
                </Toolbar>
            
        </div>
    );
};

export default Header;
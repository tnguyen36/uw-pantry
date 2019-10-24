import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemContent from './ListItemContent';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundImage: '-webkit-radial-gradient(left bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  
  headerButton: {
    outline: '1px solid white',
    color: 'white'
  },
}));

const DashHeader = (props) => {
    const classes = useStyles();
    return (
        <>
          <CssBaseline />
          <AppBar position="absolute" className={clsx(classes.appBar, props.drawerStatus && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => props.toggleDrawer(false)}
            className={clsx(classes.menuButton, props.drawerStatus && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {props.title}
          </Typography>         
          <Link style={{textDecoration: 'none'}} to="/"><Button className={classes.headerButton}>Sign Out</Button></Link>        
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !props.drawerStatus && classes.drawerPaperClose),
        }}
        open={props.drawerStatus}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => props.toggleDrawer(true)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <ListItemContent />
        {/* <Divider />
        <List>{secondaryListItems}</List> */}
      </Drawer> 
      </>   
    )
}

export default DashHeader;
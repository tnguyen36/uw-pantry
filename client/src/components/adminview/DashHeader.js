import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import { connect } from 'react-redux';
import { onSignOut } from '../../actions';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const drawerWidth = 240;

const styles = theme => ({
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
    backgroundColor: '#4b2e83'
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
    textShadow: '2px 2px 4px #000000'
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
    color: 'white',
    backgroundColor: '#3f51b5',
    backgroundImage: '-webkit-radial-gradient(left bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)',
    borderRadius: '4px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    textShadow: '2px 2px 4px #000000',
    outline: '1px solid white'
  },
});

class DashHeader extends React.Component {
    render() {
      const { classes } = this.props;
    return (
        <>
          <CssBaseline />
          <AppBar position="absolute" className={clsx(classes.appBar, this.props.drawerStatus && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => this.props.toggleDrawer(false)}
            className={clsx(classes.menuButton, this.props.drawerStatus && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {this.props.title}
          </Typography>         
          <Link style={{textDecoration: 'none'}} to="/"><Button onClick={this.props.onSignOut} className={classes.headerButton}><ExitToAppIcon/>&nbsp; Sign Out</Button></Link>        
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !this.props.drawerStatus && classes.drawerPaperClose),
        }}
        open={this.props.drawerStatus}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => this.props.toggleDrawer(true)}>
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
}



export default connect(null, {onSignOut}) (withStyles(styles)(DashHeader));
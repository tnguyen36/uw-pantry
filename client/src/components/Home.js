import React from 'react';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
      
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    textColor: {
        color: '#4b2e83'
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
    codeVerify: {
        color: 'red',
        margin: 0
    }
}));

const Home = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [code, setCode] = React.useState('');
    const [validCode, setValidCode] = React.useState(true);
    const [adminCode, setAdminCode] = React.useState('');
    
    const getAccessCode = async() => {
        const response = await axios.get('/admin/code');
        setAdminCode(response.data.accessCode);
    }
    getAccessCode();
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (e) => {
       
        if (code !== adminCode && e !== 'cancel') {
            setValidCode(false);
            e.preventDefault();
        } else {
            setValidCode(true);
            setOpen(false);
        } 
    };
    

    return (
        <div className="register-page">
            <Header location={window.location.pathname} />
            <div className={classes.heroContent}>
            <Container maxWidth="md">
                <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <img src="pantry.jpg" alt="pantry" width="250" height="200" />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography component="h1" variant="h2" align="left" className={classes.textColor}>UW Tacoma Pantry</Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h6" align="left" color="textPrimary" gutterBottom>
                                    Provides free supplemental, nutritious, and culturally relevant food as well as hygiene items to all UWT students on campus
                                </Typography>
                                <Grid item xs container direction="row" spacing={2}>
                                    <Grid item xs>
                                        <h3 className={classes.textColor}>In Store</h3>
                                        <hr></hr>
                                        <Button className={classes.link} onClick={handleClickOpen}>New User</Button>
                                    </Grid>
                                    <Grid item xs>
                                        <h3 className={classes.textColor}>Online Order</h3>
                                        <hr></hr>
                                        <Link to="order/new" style={{marginRight: '1.5rem', textDecoration: 'none'}}><Button className={classes.link}>New User</Button></Link>
                                        <Link to="/order/returning" style={{textDecoration: 'none'}} ><Button className={classes.link}>Existing User</Button></Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                           
                        </Grid>
                    </Grid>
                </Grid>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Enter Access Code</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Access Code required to continue
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Access Code"
                        type="text"
                        fullWidth
                        onChange={(e) => setCode(e.target.value)}
                    />
                    {!validCode && <h5 className={classes.codeVerify}>Incorrect Access Code</h5>}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => handleClose('cancel')} color="primary">
                        Cancel
                    </Button>
                    <Link style={{textDecoration: 'none'}} onClick={(e) => handleClose(e)} to={{pathname: '/register', state: {access: 'legal'}}}><Button color="primary">Enter</Button></Link>
                    </DialogActions>
                </Dialog>
                
            </Container>
            </div>
        </div>
    )
}

export default Home;
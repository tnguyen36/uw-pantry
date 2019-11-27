import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DashHeader from '../DashHeader';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    submit: {
        backgroundColor: '#3f51b5',
        backgroundImage: '-webkit-radial-gradient(left bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)',
        color: 'white',
        marginTop: '1rem',
        marginLeft: '1rem'
    }
}))

const SettingContent = (props) => {
    const classes = useStyles();
    const [code, setCode] = React.useState('');
    return (
        <div className={classes.root}>
            <DashHeader toggleDrawer={props.toggleDrawer} drawerStatus={props.drawerStatus} title={"Admin Settings"} />
            <main className={classes.content} onClick={() => props.toggleDrawer(true)}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}> 
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={12}>
                            <h1>Access Code : {props.code}</h1>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Access Code"
                                type="text"
                                fullWidth
                                onChange={(e) => setCode(e.target.value)}
                                value={code}
                            />
                            
                        </Grid>
                        <Grid item xs={4}>
                            <Button className={classes.submit} onClick={() => {props.changeAccessCode(code); setCode('')}}>Change Code</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <hr></hr>
                            <h1>Password Change</h1>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="New Password"
                                type="text"
                                fullWidth
                                
                            />
                            
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Confirm New Password"
                                type="text"
                                fullWidth                               
                            />                          
                        </Grid>
                        <Grid item xs={4}>
                            <Button className={classes.submit}>Change Password</Button>

                        </Grid>
                        
                        
                    </Grid>
                </Container>
            </main>
        </div>
    )
}

export default SettingContent
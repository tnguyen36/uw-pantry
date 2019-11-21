import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from '../fields/renderField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../../style.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const StudentLoginForm = (props) => {
    const useStyles = makeStyles(theme => ({
        paper: {
          marginTop: '8rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: theme.spacing(4),
          outline: '10px double aliceblue',
          borderRadius: '8px'
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(2),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
          backgroundImage: '-webkit-linear-gradient(left bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)'
        },
        logo: {
          borderRadius: '50%',
        },
        title: {
          marginTop: '0.5rem'
        }
      }));
      const classes = useStyles();
    return (
        <div>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Grid container justify="center">
                  <Grid item xs={10} sm={6} md={4} lg={4}>
                    <div className={classes.paper}>
                        <img className={classes.logo} src="/logo.png" width="80px" height="80px" alt="logo"/>
                        <h4 className="form-title">Admin Login</h4>
                        <form onSubmit={props.handleSubmit} className={classes.form}>
                            <Field name="username" component={renderField} type="text" label="Username" margin="normal" />
                            <Field name="password" component={renderField} type="password" label="Password" margin="normal" />
                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign In</Button>
                        </form>
                    </div>
                  </Grid>
                </Grid>               
            </Container>

            
        </div>
    );
}

export default reduxForm({
    form: 'loginForm'
}) (StudentLoginForm);
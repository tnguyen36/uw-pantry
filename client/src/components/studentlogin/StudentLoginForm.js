import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from '../fields/renderField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../../style.css';
import Button from '@material-ui/core/Button';

const StudentLoginForm = () => {
    const useStyles = makeStyles(theme => ({
        paper: {
          marginTop: '10rem',
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
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
          backgroundImage: '-webkit-linear-gradient(left bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)'
        },
      }));
      const classes = useStyles();
    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <h4 className="form-title">Student Login</h4>
                    <form className={classes.form}>
                        <Field name="firstName" component={renderField} type="text" label="First Name" margin="normal" />
                        <Field name="id" component={renderField} type="text" label="Student ID" margin="normal" />
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign In</Button>
                    </form>
                </div>               
            </Container>

            
        </div>
    );
}

export default reduxForm({
    form: 'loginForm'
}) (StudentLoginForm);
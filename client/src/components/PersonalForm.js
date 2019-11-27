import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from './fields/renderField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import renderSelectField from './fields/renderSelectField';
import { races } from './selectvalues/raceSelectorValues';
import { militaryAffiliation } from './selectvalues/militarySelectorValues';
import { makeStyles } from '@material-ui/core/styles';
import validate from '../formValidation';
import Container from '@material-ui/core/Container';
import '../style.css';

const styles = makeStyles(theme => ({
    button: {
        // backgroundImage: '-webkit-radial-gradient(left bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        

    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    }

}));

const PersonalForm = (props) => {
    const { handleSubmit, previousPage } = props;
    const classes = styles();
    return (
        <div>
            <Container maxWidth="sm">
                <h4 className="form-step-title">Personal Information</h4>
                <h4 className="step-label">{`Step 2 / ${window.location.pathname === '/order/new' ? '4' : '3'}`}</h4>         
                <form onSubmit={handleSubmit}>
                    <Grid item xs={12}> 
                    <Field name="address" component={renderField} label="Address" type="text" />
                    </Grid>
                    <Grid container spacing={3} direction="row"  alignItems="center">
                        <Grid item xs={6}>
                    <Field name="city" component={renderField} label="City" type="text" />
                    </Grid>
                    <Grid item xs={6}>
                    <Field name="zipCode" component={renderField} label="Zip Code" type="text" />
                    </Grid>
                    </Grid>
                    <Grid item xs={12}>
                    <Field name="ethnicity" component={renderSelectField} label="Ethnicity" selectValues={races}/>
                    </Grid>
                    <Grid item xs={12}>
                    <Field name="military" component={renderSelectField} label="Military Affliation" selectValues={militaryAffiliation} />
                    </Grid>
                  
                    <div className={classes.buttons}>
                    <Button className={classes.button} variant="contained" onClick={previousPage}>Back</Button>
                   
                  
                    <Button style={{backgroundImage: '-webkit-radial-gradient(left bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)'}} className={classes.button} type="submit" variant="contained" color="primary">Next</Button>
                    </div>
              
                </form>
           </Container>
        </div>
    )
}

export default reduxForm({
    destroyOnUnmount: false,
    validate
}) (PersonalForm);
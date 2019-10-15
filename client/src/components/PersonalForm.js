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
import '../style.css';

const styles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.7rem'
        },
        marginTop: '1rem'
    }

}));

const PersonalForm = (props) => {
    const { handleSubmit, previousPage } = props;
    const classes = styles();
    return (
        <div>
                <h4 className="form-step-title">Personal Information</h4>
                <h4 className="step-label">Step 2 / 3</h4>         
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
                    <Grid container spacing={3} direction="row" alignItems="center" justify="center">
                    <Grid item xs={4} md={3}>
                    <Button className={classes.root} variant="contained" color="primary" onClick={previousPage}>Previous</Button>
                    </Grid>
                    <Grid item xs={4} sm={3}>
                    <Button className={classes.root} type="submit" variant="contained" color="primary">Next</Button>
                    </Grid>
                    </Grid>
                </form>
           
        </div>
    )
}

export default reduxForm({
    form: 'userForm',
    destroyOnUnmount: false,
    validate
}) (PersonalForm);
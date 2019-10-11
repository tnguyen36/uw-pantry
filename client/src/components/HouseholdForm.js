import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import renderField from './renderField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import renderMemberFields from './renderMemberFields';
import { makeStyles } from '@material-ui/core/styles';
import '../style.css';

const styles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.7rem'
        },
        marginTop: '1rem'
    }

}));


const HouseholdForm = (props) => {
    const { handleSubmit, previousPage } = props;
    const classes = styles();
    return (
        <div>
                <h4 className="form-step-title">Household Information</h4>
                <h4 className="step-label">Step 3 / 3</h4>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} direction="row"  alignItems="center">
                        <Grid item xs={12}>
                            <Field name="householdNumber" component={renderField} label="# of people in household (including self)" type="number" />
                        </Grid>
                        <Grid item xs={12}>
                            <p><strong>For each member in household (including self):</strong></p>
                            <FieldArray name="members" component={renderMemberFields} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} direction="row" alignItems="center" justify="center">
                        <Grid item xs={3}>
                            <Button className={classes.root} variant="contained" color="primary" onClick={previousPage}>Previous</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className={classes.root} variant="contained" color="primary" type="submit">Submit</Button>
                        </Grid>
                    </Grid>
                </form>
                
        </div>
    )
}

export default reduxForm({
    form: 'userForm',
    destroyOnUnmount: false
}) (HouseholdForm);
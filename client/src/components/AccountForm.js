import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from './fields/renderField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { classStanding } from './selectvalues/classSelectorValues';
import renderSelectField from './fields/renderSelectField';
import validate from '../formValidation';
import '../style.css';


const AccountForm = (props) => {
    const { handleSubmit } = props;
    return (
        <div>
            <h4 className="form-step-title">Account Information</h4>
            <h4 className="step-label">Step 1 / 3</h4>     
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3} direction="row"  alignItems="center" justify="center">
                    <Grid item xs={6}>             
                        <Field name="firstName" component={renderField} label="First Name" type="text" />
                    </Grid>
                    <Grid item xs={6}>                              
                        <Field name="lastName" component={renderField} label="Last Name" type="text" />
                    </Grid>
                </Grid>
                <Grid container spacing={1} direction="row"  alignItems="center">
                    <Grid item xs={12}>
                        <Field name="id" component={renderField} label="Student ID" type="text" />
                    </Grid>
                    <Grid item xs={12}>
                        <Field name="birthDate" component={renderField} type="date" label="Birthdate" />
                    </Grid>
                    <Grid item xs={12}>
                    <Field name="classStanding" component={renderSelectField} label="Class Standing" selectValues={classStanding} />
                    </Grid>  
                    <Grid item xs={6}>
                <Button className="next-button" type="submit" variant="contained" color="primary">Next</Button>
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
})(AccountForm);
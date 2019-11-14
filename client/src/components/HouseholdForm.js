import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import renderField from './fields/renderField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import renderMemberFields from './fields/renderMemberFields';
import { makeStyles } from '@material-ui/core/styles';
import validate from '../formValidation';
import Container from '@material-ui/core/Container';
import '../style.css';


const styles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    }

}));

function initializeFields(count) {
    var result = [];
    for (var i = 0; i < count; i++) {
        result.push({firstName: ""})
    }
    return result;
}

const HouseholdForm = (props) => {
    const { handleSubmit, previousPage } = props;
    const[count, setFieldCount] = React.useState(0);
    const classes = styles();
    return (
        <div>
            <Container maxWidth="sm">
                <h4 className="form-step-title">Household Information</h4>
                <h4 className="step-label">Step 3 / 3</h4>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} direction="row"  alignItems="center">
                        <Grid item xs={12}>
                            <Field name="householdNumber" component={renderField} label="# of people in household (including self)" type="number" onChange={(event) => setFieldCount(event.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <p><strong>For each member in household (including self):</strong></p>
                            <FieldArray name="members" component={renderMemberFields} />
                        </Grid>
                    </Grid>                   
                        <div className={classes.buttons}>
                            <Button className={classes.button} variant="contained"  onClick={previousPage}>Back</Button>                      
                            <Button style={{backgroundImage: '-webkit-radial-gradient(left bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)'}} className={classes.button} variant="contained" color="primary" type="submit">Submit</Button>
                        </div>
                    
                </form>
                </Container>               
        </div>
    )
}

export default reduxForm({
    form: 'userForm',
    destroyOnUnmount: false,
    validate,
}) (HouseholdForm);
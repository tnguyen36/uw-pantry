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
    },
    errorText: {
        color: 'red',
        margin: 0
    }

}));

const validateForm = (houseNumber, members) => {
    if (houseNumber > 0 && !members) {
        return true
    } else if (members) {
        if (parseInt(houseNumber, 10) !== members.length) {
            return true
        } else {
            return false
        }
    }
    return false
}


const HouseholdForm = (props) => {
    const { handleSubmit, previousPage } = props;
    const [houseNumber, setHouseNumber] = React.useState(0);
    const [members, setMembers] = React.useState([]);
    var error = validateForm(houseNumber, members);
;   const classes = styles();
    return (
        <div>
            <Container maxWidth="sm">
                <h4 className="form-step-title">Household Information</h4>
                <h4 className="step-label">{`Step 3 / ${window.location.pathname === '/order/new' ? '4' : '3'}`}</h4>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} direction="row"  alignItems="center">
                        <Grid item xs={12}>
                            <Field name="householdNumber" onChange={(e) => setHouseNumber(e.target.value)} component={renderField} label="# of people in household (including self)" type="number"/>
                            {error && <h5 className={classes.errorText}>Please add members below according to this number</h5>}
                        </Grid>
                        <Grid item xs={12}>
                            <p><strong>For each member in household (including self):</strong></p>
                            <FieldArray name="members" setMembers={setMembers} component={renderMemberFields} />
                        </Grid>
                    </Grid>                   
                        <div className={classes.buttons}>
                            <Button className={classes.button} variant="contained"  onClick={previousPage}>Back</Button>                      
                            <Button style={{backgroundImage: '-webkit-radial-gradient(left bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)'}} disabled={error} className={classes.button} variant="contained" color="primary" type="submit">{window.location.pathname === '/order/new' ? 'Next' : 'Submit'}</Button>
                        </div>
                    
                </form>
                </Container>               
        </div>
    )
}

export default reduxForm({
    destroyOnUnmount: false,
    validate,
}) (HouseholdForm);
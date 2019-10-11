import React from 'react';
import AccountForm from './AccountForm';
import PersonalForm from './PersonalForm';
import HouseholdForm from './HouseholdForm';
import FormStepper from './FormStepper';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import '../style.css';




class FormWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }

    nextPage = () => {
        this.setState({ page: this.state.page  + 1});
    }

    previousPage = () => {
        this.setState({ page: this.state.page - 1});
    }

    onSubmit = (formValues) => {
        console.log(formValues);
       this.props.createUser(formValues);
    }

    


    render() {
        const { page } = this.state;
        
        
        return (
            <div>
                
                <Container maxWidth="md">
                    <div className="form">
                        <Grid container direction="column" justify="center" alignItems="center">
                        <h2 className="form-title">STUDENT INITIAL USAGE</h2>
                        <h4 className="form-subtitle">Fill all form field to go to next step</h4>
                        
                        <FormStepper activeStep={this.state.page - 1} />
                        {page === 1 && <AccountForm onSubmit={this.nextPage} />}
                        {page === 2 && <PersonalForm previousPage={this.previousPage} onSubmit={this.nextPage} />}
                        {page === 3 && <HouseholdForm previousPage={this.previousPage} onSubmit={this.onSubmit} />}
                        </Grid>
                    </div>
                </Container>
            </div>
        );
    }
}

export default connect(null, {createUser}) (FormWizard);
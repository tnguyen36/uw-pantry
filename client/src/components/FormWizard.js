import React from 'react';
import AccountForm from './AccountForm';
import PersonalForm from './PersonalForm';
import HouseholdForm from './HouseholdForm';
import FormStepper from './FormStepper';
import { connect } from 'react-redux';
import { createUser, offSnackBar } from '../actions';
import Container from '@material-ui/core/Container';
import SnackBar from './SnackBar';
import Header from './Header';
import '../style.css';
import history from '../history';
import { socket } from '../socket';


class FormWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
        this.error = this.props.error;
    }

    nextPage = () => {
        this.setState({ page: this.state.page  + 1});
    }

    previousPage = () => {
        this.setState({ page: this.state.page - 1});
    }

    onSubmit = async (formValues) => {    
       await this.props.createUser(formValues);
       socket.emit('newUser')
      
    }

    redirectUser = () => {
        history.push('/');
        return null;
    }
 
    render() {
        if (!this.props.location.state) {
           return this.redirectUser() 
        } else {

        const { page } = this.state;  
        return (
            <div className="register-page">
                <Header location={window.location.pathname} />
                <Container maxWidth="md">
                    <div className="form">                      
                        <h2 className="form-title">Student Initial Usage</h2>
                        <h4 className="form-subtitle">Fill all form fields to continue</h4>
                        
                        <FormStepper activeStep={this.state.page - 1} />
                        {page === 1 && <AccountForm onSubmit={this.nextPage} form="userForm" />}
                        {page === 2 && <PersonalForm previousPage={this.previousPage} form="userForm" onSubmit={this.nextPage} />}
                        {page === 3 && <HouseholdForm previousPage={this.previousPage} form="userForm" onSubmit={this.onSubmit} />}                       
                    </div>

                </Container>
                {this.props.error.toggleSnackBar && <SnackBar offSnackBar={this.props.offSnackBar} variant={this.props.error.variant} description={this.props.error.description} />}
            </div>
        );
    }
}
}

const mapStateToProps = state => {
    return ({
        error: state.error,
    })
}

export default connect(mapStateToProps, {createUser, offSnackBar}) (FormWizard);
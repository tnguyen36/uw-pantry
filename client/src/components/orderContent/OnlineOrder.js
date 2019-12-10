import React from 'react';
import AccountForm from '../AccountForm';
import PersonalForm from '../PersonalForm';
import HouseholdForm from '../HouseholdForm';
import OrderForm from '../orderContent/OrderForm'
import FormStepper from '../FormStepper';
import Container from '@material-ui/core/Container';
import Header from '../Header';
import SnackBar from '../SnackBar';
import { connect } from 'react-redux';
import { createUser, offSnackBar } from '../../actions';
import { socket } from '../../socket';
import { reset } from 'redux-form';
import '../../style.css';

class OnlineOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            householdNumber: 0
        }
        this.error = this.props.error;
    }

    componentWillUnmount() {
        this.props.reset('orderForm')
    }

    nextPage = () => {
        this.setState({ page: this.state.page  + 1});
    }

    previousPage = () => {
        this.setState({ page: this.state.page - 1});
    }

    setHouseholdNumber = number => {
        this.setState({householdNumber: number})
    }

    onSubmit = async formValues => {    
        await this.props.createUser(formValues);
        socket.emit('newUser');
     }
 

    render() {
        const { page } = this.state;
        
        
        return (
            <div className="register-page">
                <Header location={window.location.pathname} />
                <Container maxWidth="md">
                    <div className="form">                      
                        <h2 className="form-title">Online Order - New User</h2>
                        <h4 className="form-subtitle">Fill all form fields to continue</h4>
                        
                        <FormStepper activeStep={this.state.page - 1} />
                        {page === 1 && <AccountForm onSubmit={this.nextPage} form="orderForm"/>}
                        {page === 2 && <PersonalForm previousPage={this.previousPage} form="orderForm" onSubmit={this.nextPage} />}
                        {page === 3 && <HouseholdForm previousPage={this.previousPage} form="orderForm" setHouseholdNumber={this.setHouseholdNumber} householdNumber={this.state.householdNumber} onSubmit={this.nextPage} />}
                        {page === 4 && <OrderForm previousPage={this.previousPage} form="orderForm" onSubmit={this.onSubmit} />}
                    </div>

                </Container>
                {this.props.error.toggleSnackBar && <SnackBar offSnackBar={this.props.offSnackBar} variant={this.props.error.variant} description={this.props.error.description} />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return ({
        error: state.error
    })
}

export default connect(mapStateToProps, {createUser, offSnackBar, reset}) (OnlineOrder);
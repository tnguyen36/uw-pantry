import React from 'react';
import OrderForm from '../orderContent/OrderForm'
import Container from '@material-ui/core/Container';
import Header from '../Header';
import SnackBar from '../SnackBar';
import { connect } from 'react-redux';
import { createReturningUser, offSnackBar } from '../../actions';
import { socket } from '../../socket';

import '../../style.css';

class ReturnUserOrder extends React.Component {
    constructor(props) {
        super(props);
        this.error = this.props.error;
    }

    
    onSubmit = async formValues => {    
        await this.props.createReturningUser(formValues);
        socket.emit('newUser');
     }
 


    render() {
        
        return (
        <div className="register-page">
            <Header location={window.location.pathname} />
            <Container maxWidth="md">
                    <div className="form">                      
                        <h2 className="form-title">Online Order - Returning User</h2>
                        <h4 className="form-subtitle">Fill all form fields to continue</h4>                       
                         <OrderForm form="returnUserOrderForm" onSubmit={this.onSubmit} />
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

export default connect(mapStateToProps, {createReturningUser, offSnackBar}) (ReturnUserOrder);
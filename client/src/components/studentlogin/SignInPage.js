import React from 'react';
import StudentLoginForm from './StudentLoginForm';
import SnackBar from '../SnackBar';
import { connect } from 'react-redux';
import { onSignIn, offSnackBar } from '../../actions';
import Header from '../Header';


class SignInPage extends React.Component {
    
    onSubmit = (formValues) => {
       this.props.onSignIn(formValues);
    }
    
    render() {
        return (
            <div className="register-page">
                <Header location={window.location.pathname} />
                <StudentLoginForm onSubmit={this.onSubmit} />
                {this.props.error.toggleSnackBar && <SnackBar offSnackBar={this.props.offSnackBar} variant={this.props.error.variant} description={this.props.error.description} />}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        error: state.error,
    }
}

export default connect(mapStateToProps, {onSignIn, offSnackBar}) (SignInPage);
import React from 'react';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import FormWizard from './FormWizard';
import SignInPage from './studentlogin/SignInPage';
import '../style.css';


class App extends React.Component {
    render() {
        return (
            <div>
                <FormWizard />
                {/* <SignInPage /> */}

                
            </div>
        );
    }
}



export default connect(null, {createUser})(App);
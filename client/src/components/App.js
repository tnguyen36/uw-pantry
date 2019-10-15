import React from 'react';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import { BrowserRouter, Route } from 'react-router-dom';
import FormWizard from './FormWizard';
// import SignInPage from './studentlogin/SignInPage';
import Dashboard from './adminview/Dashboard';

import '../style.css';


class App extends React.Component {
    render() {
        return (
            <div>
                
                <BrowserRouter>
                    <div>
                        {/* <Header /> */}
                        <Route path="/" exact component={FormWizard}/>
                        <Route path="/dashboard" component={Dashboard}/>
                    </div>
                
                </BrowserRouter>
               

                {/* <SignInPage /> */}
                {/* <Dashboard /> */}

                
            </div>
        );
    }
}



export default connect(null, {createUser})(App);